
export interface MemoItem {
  title: string;
  content: string;
  type: "section" | "text"; // "text" for non-collapsible headers, "section" for collapsible
  children?: MemoItem[];
}

export interface FlashcardData {
  question: string;
  answer: string;
}

export interface QuizQuestionData {
  question: string;
  options: string[];
  answer: number; // Index of the correct option
  explanation: string;
}

export interface YouTubeVideo {
  title: string;
  url: string;
}

export interface MemoFicheData {
  title: string;
  image: string;
  memoData: MemoItem[];
  flashcardsData: FlashcardData[];
  quizQuestionsData: QuizQuestionData[];
  glossaryTerms: string[];
  kahootLink?: string;
  youtubeVideos?: YouTubeVideo[];
  podcastLink?: string;
}

export interface MemoFiches {
  [key: string]: MemoFicheData;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

export enum TabId {
  Memo = 'memo',
  Flashcards = 'flashcards',
  Quiz = 'quiz',
  Glossary = 'glossary',
  Kahoot = 'kahoot',
  Podcast = 'podcast',
  YouTube = 'youtube',
}
