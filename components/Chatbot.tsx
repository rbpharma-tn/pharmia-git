
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, RefreshCw, ArrowRight, Send } from 'lucide-react';
import { ChatMessage } from '../types';
import { askChatbot } from '../services/geminiService';

interface ChatbotProps {
  memoContent: string;
  ficheTitle: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ memoContent, ficheTitle }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatHistory, isChatbotTyping]);
  
  // Add initial bot message when chatbot opens and history is empty
  useEffect(() => {
    if (isChatbotOpen && chatHistory.length === 0) {
      setChatHistory([{ sender: 'bot', message: `Bonjour ! Posez-moi une question sur la mémofiche "${ficheTitle}".` }]);
    }
  }, [isChatbotOpen, ficheTitle, chatHistory.length]);


  const handleSendMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const userMessage = chatInput.trim();
    if (!userMessage || isChatbotTyping) return;

    const newChatHistory: ChatMessage[] = [...chatHistory, { sender: 'user', message: userMessage }];
    setChatHistory(newChatHistory);
    setChatInput('');
    setIsChatbotTyping(true);

    try {
      const botResponse = await askChatbot(userMessage, memoContent, ficheTitle);
      setChatHistory(prev => [...prev, { sender: 'bot', message: botResponse }]);
    } catch (error: any) {
      console.error("Erreur du chatbot:", error);
      setChatHistory(prev => [...prev, { sender: 'bot', message: `Désolé, une erreur est survenue: ${error.message}. Veuillez réessayer.` }]);
    } finally {
      setIsChatbotTyping(false);
    }
  };

  const clearChat = () => {
    setChatHistory([{ sender: 'bot', message: `Bonjour ! Posez-moi une question sur la mémofiche "${ficheTitle}".` }]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="bg-slate-800 text-white rounded-full p-4 shadow-lg hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-300"
        aria-label={isChatbotOpen ? "Fermer le chatbot" : "Ouvrir le chatbot"}
      >
        {isChatbotOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
      </button>

      {isChatbotOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 max-h-[70vh] bg-white border border-slate-200 rounded-xl shadow-2xl flex flex-col animate-scaleIn origin-bottom-right">
          <div className="flex justify-between items-center bg-slate-800 text-white p-3 sm:p-4 rounded-t-xl">
            <h4 className="text-md sm:text-lg font-semibold">Chatbot Mémofiche</h4>
            <div className="flex gap-2">
              <button onClick={clearChat} className="p-1 rounded-full hover:bg-slate-700 transition-colors" title="Effacer le chat">
                <RefreshCw className="h-4 w-4" />
              </button>
              <button onClick={() => setIsChatbotOpen(false)} className="p-1 rounded-full hover:bg-slate-700 transition-colors" title="Fermer">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 text-sm custom-scrollbar">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2.5 rounded-lg max-w-[85%] shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                }`}>
                  {/* Naive link detection - improve if needed */}
                  {msg.message.split(' ').map((word, i) => 
                    word.startsWith('http') ? <a key={i} href={word} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400">{word} </a> : `${word} `
                  )}
                </div>
              </div>
            ))}
            {isChatbotTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-800 p-2.5 rounded-lg rounded-bl-none border border-slate-200 flex items-center space-x-1">
                  <span className="animate-pulse">Typing</span>
                  <span className="animate-bounce delay-75">.</span>
                  <span className="animate-bounce delay-150">.</span>
                  <span className="animate-bounce delay-225">.</span>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Votre question..."
                className="flex-1 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none text-sm"
                disabled={isChatbotTyping}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={isChatbotTyping || !chatInput.trim()}
                aria-label="Envoyer le message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
