
import { GoogleGenAI, GenerateContentResponse, Part, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { memoFichesData } from '../constants'; // To get titles

// Ensure API_KEY is available in the environment.
// In a real GitHub Pages deployment without a backend, this key would be exposed.
// The instructions assume process.env.API_KEY is pre-configured and accessible.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY for Gemini is not set. Please set the environment variable.");
  //throw new Error("API_KEY for Gemini is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_HERE_IF_NO_ENV" }); // Fallback for local dev if no env
const model = 'gemini-2.5-flash-preview-04-17';

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];


/**
 * Generic function to call Gemini API.
 */
async function generateContentFromGemini(
  prompt: string,
  responseSchema?: object
): Promise<string | object> {
  if (!API_KEY) {
    return Promise.reject("API_KEY for Gemini is not set.");
  }

  const contents: Part[] = [{ text: prompt }];

  try {
    const result: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: [{ role: "user", parts: contents }],
      ...(responseSchema && {
        config: {
          responseMimeType: "application/json",
          // @ts-ignore TODO: Check if responseSchema needs to be typed more strictly for the SDK
          responseSchema: responseSchema, 
          safetySettings: safetySettings,
        },
      }),
      ...(!responseSchema && {
        config: {
            safetySettings: safetySettings,
        }
      })
    });
    
    const responseText = result.text;

    if (responseSchema) {
      // Clean potential markdown fences for JSON
      let jsonStr = responseText.trim();
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[2]) {
        jsonStr = match[2].trim();
      }
      try {
        return JSON.parse(jsonStr);
      } catch (jsonError: any) {
        console.error("Erreur de parsing JSON de la réponse Gemini:", jsonError, "Raw text:", responseText);
        throw new Error(`Réponse JSON mal formée de l'API Gemini: ${jsonError.message}`);
      }
    }
    return responseText;
  } catch (error: any) {
    console.error("Erreur lors de l'appel à l'API Gemini:", error);
    throw new Error(`Erreur API Gemini: ${error.message || 'Unknown error'}`);
  }
}

export const fetchGlossaryDefinitions = async (terms: string[]): Promise<Record<string, string>> => {
  if (!terms || terms.length === 0) return {};

  const prompt = `Fournis les définitions des termes médicaux suivants dans un format JSON. Pour chaque terme, donne une définition claire et concise, comme un glossaire médical. Les termes sont: ${terms.join(', ')}. Le format JSON doit être un tableau d'objets, où chaque objet a une clé 'term' et une clé 'definition'. Exemple: [{"term": "Exemple", "definition": "Ceci est une définition d'exemple."}].`;
  
  const responseSchema = {
    type: "ARRAY",
    items: {
      type: "OBJECT",
      properties: {
        term: { type: "STRING" },
        definition: { type: "STRING" },
      },
      required: ["term", "definition"],
    },
  };

  try {
    const definitionsArray = await generateContentFromGemini(prompt, responseSchema) as Array<{term: string, definition: string}>;
    const definitionsMap: Record<string, string> = {};
    if (Array.isArray(definitionsArray)) {
      definitionsArray.forEach(item => {
        if (item.term && item.definition) {
          definitionsMap[item.term] = item.definition;
        }
      });
    }
    return definitionsMap;
  } catch (error) {
    console.error("Erreur lors de la récupération des définitions du glossaire:", error);
    return {};
  }
};

export const explainMedicalTerm = async (term: string): Promise<string> => {
  if (!term) return "Veuillez entrer un terme à expliquer.";
  const prompt = `Explique le terme médical suivant de manière concise et claire, adaptée à un pharmacien ou un étudiant en pharmacie: "${term}". Ne donne que l'explication, sans introduction ni conclusion.`;
  try {
    const explanation = await generateContentFromGemini(prompt) as string;
    return explanation;
  } catch (error) {
    console.error("Erreur lors de l'explication du terme médical:", error);
    return "Impossible d'obtenir une explication pour ce terme pour le moment.";
  }
};

export const askChatbot = async (userMessage: string, memoContent: string, ficheTitle: string): Promise<string> => {
    const prompt = `Tu es un assistant pharmacien expert sur le sujet de la mémofiche "${ficheTitle}".
Réponds à la question suivante de l'utilisateur: "${userMessage}".
Utilise UNIQUEMENT les informations fournies dans le contenu de la mémofiche ci-dessous.
Si la réponse n'est pas dans le texte fourni, indique clairement que tu ne peux pas répondre avec les informations disponibles sur cette mémofiche. Ne cherche pas d'informations en dehors de ce contexte.
Sois concis et direct.

Contenu de la mémofiche "${ficheTitle}":
---
${memoContent}
---
Question de l'utilisateur: "${userMessage}"
Réponse:`;

    try {
        const botResponse = await generateContentFromGemini(prompt) as string;
        return botResponse;
    } catch (error) {
        console.error("Erreur du chatbot Gemini:", error);
        return "Désolé, une erreur est survenue lors de la communication avec l'assistant. Veuillez réessayer.";
    }
};
