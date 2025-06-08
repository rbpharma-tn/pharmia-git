
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, Check, X, Home, RefreshCw, Mic, Youtube, MessageSquare, ExternalLink, PlayCircle, BookOpen, Brain, HelpCircle, ListChecks } from "lucide-react";
import { memoFichesData } from './constants';
import { MemoFicheData, MemoItem, FlashcardData, QuizQuestionData, ChatMessage, TabId, YouTubeVideo } from './types';
import LandingPage from './components/LandingPage';
import MemoSection from './components/MemoSection';
import Chatbot from './components/Chatbot';
import { fetchGlossaryDefinitions, explainMedicalTerm } from './services/geminiService';

const App: React.FC = () => {
  const [selectedFicheId, setSelectedFicheId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>(TabId.Memo);
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());

  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [medicalTermInput, setMedicalTermInput] = useState('');
  const [medicalExplanation, setMedicalExplanation] = useState('');
  const [isExplainingTerm, setIsExplainingTerm] = useState(false);
  const [glossaryTermsMap, setGlossaryTermsMap] = useState<Record<string, string>>({});
  const [isLoadingGlossary, setIsLoadingGlossary] = useState(false);
  
  const [visitedTabs, setVisitedTabs] = useState<Set<TabId>>(new Set());

  const [completionProgress, setCompletionProgress] = useState<Record<string, number>>(() => {
    const initialProgress: Record<string, number> = {};
    Object.keys(memoFichesData).forEach(ficheId => {
      initialProgress[ficheId] = 0;
    });
    return initialProgress;
  });

  const currentFicheData: MemoFicheData | null = selectedFicheId ? memoFichesData[selectedFicheId] : null;

  const extractMemoContentForChatbot = useCallback((memoData?: MemoItem[]): string => {
    let content = '';
    const extractSectionContent = (sections: MemoItem[]) => {
      sections.forEach(section => {
        if (section.content) {
          content += section.title ? `${section.title}: ${section.content}\n\n` : `${section.content}\n\n`;
        }
        if (section.children && section.children.length > 0) {
          extractSectionContent(section.children);
        }
      });
    };
    if (memoData) {
      extractSectionContent(memoData);
    }
    return content;
  }, []);

  const memoFicheContentForChatbot = useMemo(() => {
    return currentFicheData ? extractMemoContentForChatbot(currentFicheData.memoData) : '';
  }, [currentFicheData, extractMemoContentForChatbot]);

  const calculateProgress = useCallback(() => {
    if (!currentFicheData) return 0;

    let totalPossiblePoints = 0;
    let earnedPoints = 0;

    const countAllCollapsibleSectionsRecursive = (sections: MemoItem[]): number => {
        let count = 0;
        sections.forEach(item => {
            if (item.type === "section") {
                count++;
                if (item.children) {
                    count += countAllCollapsibleSectionsRecursive(item.children);
                }
            }
        });
        return count;
    };

    const memoSectionPoints = countAllCollapsibleSectionsRecursive(currentFicheData.memoData);
    totalPossiblePoints += memoSectionPoints;

    const findSectionInCurrentFiche = (sections: MemoItem[], targetKey: string, currentPath = 'section'): boolean => {
        for (let i = 0; i < sections.length; i++) {
            const item = sections[i];
            const itemKey = `${currentPath}-${i}`; // Construct key as 'section-0', 'section-0-0'
            if (itemKey === targetKey && item.type === 'section') {
                return true;
            }
            if (item.children && findSectionInCurrentFiche(item.children, targetKey, itemKey)) {
                return true;
            }
        }
        return false;
    };
    
    visitedSections.forEach(key => {
        if (findSectionInCurrentFiche(currentFicheData.memoData, key)) {
          earnedPoints++;
        }
    });
    
    const tabPointsMapping: Partial<Record<TabId, boolean>> = {
        [TabId.Flashcards]: !!(currentFicheData.flashcardsData && currentFicheData.flashcardsData.length > 0),
        [TabId.Quiz]: !!(currentFicheData.quizQuestionsData && currentFicheData.quizQuestionsData.length > 0),
        [TabId.Glossary]: !!(currentFicheData.glossaryTerms && currentFicheData.glossaryTerms.length > 0),
        [TabId.Kahoot]: !!currentFicheData.kahootLink,
        [TabId.YouTube]: !!(currentFicheData.youtubeVideos && currentFicheData.youtubeVideos.length > 0),
        [TabId.Podcast]: !!currentFicheData.podcastLink,
    };

    (Object.keys(tabPointsMapping) as TabId[]).forEach(tabName => {
        if (tabPointsMapping[tabName]) {
            totalPossiblePoints += 1; 
            if (visitedTabs.has(tabName)) {
                earnedPoints += 1;
            }
        }
    });

    if (currentFicheData.quizQuestionsData && currentFicheData.quizQuestionsData.length > 0) {
        totalPossiblePoints += 1; 
        if (quizCompleted) {
            earnedPoints += 1;
        }
    }

    if (totalPossiblePoints === 0) return 0;
    return Math.min(100, Math.round((earnedPoints / totalPossiblePoints) * 100));

  }, [currentFicheData, visitedSections, visitedTabs, quizCompleted]);

  useEffect(() => {
    if (selectedFicheId) {
      const newProgress = calculateProgress();
      setCompletionProgress(prev => ({
        ...prev,
        [selectedFicheId]: newProgress
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFicheId, visitedSections, visitedTabs, quizCompleted, calculateProgress]); // Removed expandedSections as it's covered by visitedSections


  const resetFicheState = () => {
    setActiveTab(TabId.Memo);
    setExpandedSections({});
    setVisitedSections(new Set());
    setVisitedTabs(new Set());
    setCurrentCard(0);
    setIsFlipped(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false);
    setMedicalTermInput('');
    setMedicalExplanation('');
    setIsExplainingTerm(false);
    setGlossaryTermsMap({});
    setIsLoadingGlossary(false);
  };

  const handleSelectFiche = (ficheId: string) => {
    resetFicheState();
    setSelectedFicheId(ficheId);
    // Mark memo tab as visited by default when a fiche is selected
    setVisitedTabs(prev => new Set(prev).add(TabId.Memo));
  };
  
  const handleGoHome = () => {
    resetFicheState();
    setSelectedFicheId(null);
  };
  
  const toggleSection = (key: string) => {
    setExpandedSections(prev => {
      const newExpandedState = { ...prev, [key]: !prev[key] };
      if (newExpandedState[key]) {
        setVisitedSections(prevVisited => new Set(prevVisited).add(key));
      }
      return newExpandedState;
    });
  };
  
  const handleSetActiveTab = (tabName: TabId) => {
    setActiveTab(tabName);
    setVisitedTabs(prevVisited => new Set(prevVisited).add(tabName));
  };

  const nextCard = () => {
    if (!currentFicheData || !currentFicheData.flashcardsData.length) return;
    setIsFlipped(false);
    setTimeout(() => setCurrentCard(prev => (prev + 1) % currentFicheData.flashcardsData.length), 200);
  };

  const prevCard = () => {
    if (!currentFicheData || !currentFicheData.flashcardsData.length) return;
    setIsFlipped(false);
    setTimeout(() => setCurrentCard(prev => (prev - 1 + currentFicheData.flashcardsData.length) % currentFicheData.flashcardsData.length), 200);
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null || !currentFicheData) return;
    setSelectedOption(optionIndex);
    if (optionIndex === currentFicheData.quizQuestionsData[currentQuestion].answer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (!currentFicheData) return;
    if (currentQuestion < currentFicheData.quizQuestionsData.length - 1) {
      setCurrentQuestion(q => q + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false);
  };

  const loadInitialGlossaryTerms = useCallback(async () => {
    if (!currentFicheData || isLoadingGlossary || Object.keys(glossaryTermsMap).length > 0 || !currentFicheData.glossaryTerms || currentFicheData.glossaryTerms.length === 0) {
      if (currentFicheData && (!currentFicheData.glossaryTerms || currentFicheData.glossaryTerms.length === 0)) {
        setGlossaryTermsMap({}); // Ensure it's empty if no terms
      }
      return;
    }
    
    setIsLoadingGlossary(true);
    try {
      const fetchedTerms = await fetchGlossaryDefinitions(currentFicheData.glossaryTerms);
      setGlossaryTermsMap(fetchedTerms);
    } catch (error) {
      console.error("Erreur chargement glossaire:", error);
      setGlossaryTermsMap({}); // Set to empty on error to prevent re-fetch loop with old data
    } finally {
      setIsLoadingGlossary(false);
    }
  }, [currentFicheData, isLoadingGlossary, glossaryTermsMap]);

  useEffect(() => {
      if (selectedFicheId && activeTab === TabId.Glossary) {
          loadInitialGlossaryTerms();
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFicheId, activeTab, loadInitialGlossaryTerms]);

  const highlightTextWithGlossary = useCallback((text: string): React.ReactNode => {
     if (!glossaryTermsMap || Object.keys(glossaryTermsMap).length === 0 || !text) {
      return text;
    }

    let result: (string | JSX.Element)[] = [text];
    let keyCounter = 0;

    Object.keys(glossaryTermsMap).forEach(termKey => {
      const definition = glossaryTermsMap[termKey];
      const escapedTermKey = termKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b(${escapedTermKey})\\b`, 'gi');

      let nextResult: (string | JSX.Element)[] = [];
      result.forEach(segment => {
        if (typeof segment === 'string') {
          const parts = segment.split(regex);
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (i % 2 === 1) { 
              nextResult.push(
                <span
                  key={`highlight-${termKey}-${keyCounter++}`}
                  className="relative group cursor-help font-semibold text-blue-600 hover:text-blue-800 border-b border-dotted border-blue-400"
                  title={definition}
                >
                  {part}
                </span>
              );
            } else { 
              if (part) { 
                nextResult.push(part);
              }
            }
          }
        } else {
          nextResult.push(segment);
        }
      });
      result = nextResult;
    });
    return result;
  }, [glossaryTermsMap]);
  
  const handleExplainMedicalTerm = async () => {
    if (!medicalTermInput.trim()) return;
    setIsExplainingTerm(true);
    setMedicalExplanation('');
    try {
      const explanation = await explainMedicalTerm(medicalTermInput);
      setMedicalExplanation(explanation);
    } catch (error: any) {
      setMedicalExplanation(`Une erreur est survenue lors de l'explication du terme: ${error.message}`);
      console.error("Erreur lors de l'explication du terme:", error);
    } finally {
      setIsExplainingTerm(false);
    }
  };

  const TABS_CONFIG = [
    { id: TabId.Memo, label: 'Mémo', icon: BookOpen },
    { id: TabId.Flashcards, label: 'Flashcards', icon: Brain },
    { id: TabId.Quiz, label: 'Quiz', icon: HelpCircle },
    { id: TabId.Glossary, label: 'Glossaire', icon: ListChecks },
    { id: TabId.Kahoot, label: 'Kahoot!', icon: PlayCircle },
    { id: TabId.Podcast, label: 'Podcast', icon: Mic },
    { id: TabId.YouTube, label: 'YouTube', icon: Youtube },
  ];
  

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-6 max-w-5xl mx-auto font-sans text-slate-900 rounded-lg shadow-2xl relative pb-24">
      
      {!currentFicheData ? (
        <LandingPage onSelectFiche={handleSelectFiche} completionProgress={completionProgress}/>
      ) : (
        <>
          <header className="mb-6 border-b border-slate-200 pb-5 flex justify-between items-center">
            <div className="flex-grow">
                <h1 className="text-xl sm:text-2xl font-light text-slate-600">Mémo fiche conseil</h1>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-1">{currentFicheData.title}</h2>
            </div>
            <button
                onClick={handleGoHome}
                title="Retour à l'accueil"
                className="p-3 bg-white text-slate-700 rounded-full hover:bg-slate-100 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
            >
                <Home className="h-5 w-5" />
            </button>
          </header>

          <div className="mb-6 sticky top-3 bg-white/80 backdrop-blur-md z-20 py-3 px-2 rounded-xl shadow-lg border border-slate-200">
            <nav className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {TABS_CONFIG.map((tab) => {
                // Conditional rendering for tabs based on data availability
                if (tab.id === TabId.Flashcards && (!currentFicheData.flashcardsData || currentFicheData.flashcardsData.length === 0)) return null;
                if (tab.id === TabId.Quiz && (!currentFicheData.quizQuestionsData || currentFicheData.quizQuestionsData.length === 0)) return null;
                if (tab.id === TabId.Glossary && (!currentFicheData.glossaryTerms || currentFicheData.glossaryTerms.length === 0)) return null;
                if (tab.id === TabId.Kahoot && !currentFicheData.kahootLink) return null;
                if (tab.id === TabId.Podcast && !currentFicheData.podcastLink) return null;
                if (tab.id === TabId.YouTube && (!currentFicheData.youtubeVideos || currentFicheData.youtubeVideos.length === 0)) return null;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSetActiveTab(tab.id)}
                    className={`px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm rounded-lg transition-all duration-200 ease-in-out font-medium whitespace-nowrap flex items-center gap-2 group
                      ${activeTab === tab.id
                        ? 'bg-slate-800 text-white shadow-md scale-105'
                        : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 hover:shadow-sm'}`}
                  >
                    <tab.icon size={16} className={`transition-colors ${activeTab === tab.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mb-6 w-full px-1">
              <div className="text-right text-sm font-semibold text-slate-700 mb-1">
                  Progression: {completionProgress[selectedFicheId!] || 0}%
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
                  <div
                      className="bg-slate-700 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${completionProgress[selectedFicheId!] || 0}%` }}
                  ></div>
              </div>
          </div>

          {activeTab === TabId.Memo && (
            <section className="space-y-4 mb-12 animate-fadeIn">
              {currentFicheData.memoData.map((item, index) => (
                <MemoSection
                  key={`section-${index}`}
                  item={item}
                  sectionKey={`section-${index}`} // Base key for top-level items
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  highlightTextWithGlossary={highlightTextWithGlossary}
                />
              ))}
            </section>
          )}
          
          {activeTab === TabId.Flashcards && currentFicheData.flashcardsData && currentFicheData.flashcardsData.length > 0 && (
            <section className="mb-12 flex flex-col items-center animate-fadeIn">
              <div
                className="relative h-72 w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl p-6 mb-6 cursor-pointer group"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ perspective: '1200px' }}
              >
                <div className={`relative w-full h-full transition-transform duration-700 ease-in-out`}
                     style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transformStyle: 'preserve-3d' }}>
                  <div
                    className="absolute inset-0 p-6 flex flex-col items-center justify-center bg-white rounded-2xl shadow-inner"
                    style={{ transform: 'rotateY(0deg)', backfaceVisibility: 'hidden', opacity: isFlipped ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
                  >
                    <p className="text-xs font-medium text-slate-500 mb-3 tracking-wider uppercase">Question</p>
                    <p className="text-xl sm:text-2xl font-semibold text-center text-slate-800">{currentFicheData.flashcardsData[currentCard].question}</p>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center text-xs text-slate-400 group-hover:text-slate-500 transition-colors">
                      <RefreshCw size={14} className="mr-1.5" />
                      Cliquez pour tourner
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 p-6 flex flex-col items-center justify-center bg-slate-50 rounded-2xl shadow-inner border border-slate-200"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', opacity: isFlipped ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
                  >
                    <p className="text-xs font-medium text-slate-500 mb-3 tracking-wider uppercase">Réponse</p>
                    <p className="text-xl sm:text-2xl font-semibold text-center text-slate-700">{currentFicheData.flashcardsData[currentCard].answer}</p>
                     <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center text-xs text-slate-400 group-hover:text-slate-500 transition-colors">
                      <RefreshCw size={14} className="mr-1.5" />
                      Cliquez pour tourner
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full max-w-lg mt-4">
                <button onClick={prevCard} className="p-3 bg-white hover:bg-slate-100 rounded-full transition-colors shadow-md border border-slate-200 active:scale-95" aria-label="Carte précédente">
                  <ArrowRight className="h-6 w-6 transform rotate-180 text-slate-600" />
                </button>
                <span className="text-base font-medium text-slate-600">{currentCard + 1} / {currentFicheData.flashcardsData.length}</span>
                <button onClick={nextCard} className="p-3 bg-white hover:bg-slate-100 rounded-full transition-colors shadow-md border border-slate-200 active:scale-95" aria-label="Carte suivante">
                  <ArrowRight className="h-6 w-6 text-slate-600" />
                </button>
              </div>
            </section>
          )}

          {activeTab === TabId.Quiz && currentFicheData.quizQuestionsData && currentFicheData.quizQuestionsData.length > 0 && (
            <section className="mb-12 animate-fadeIn">
              {!quizCompleted ? (
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xl">
                  <div className="flex justify-between items-center mb-6 sm:mb-8">
                    <span className="text-sm sm:text-base text-slate-500">Question {currentQuestion + 1}/{currentFicheData.quizQuestionsData.length}</span>
                    <span className="text-sm sm:text-base font-semibold text-slate-700">Score: {score}/{currentFicheData.quizQuestionsData.length}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-6 sm:mb-8">{currentFicheData.quizQuestionsData[currentQuestion].question}</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {currentFicheData.quizQuestionsData[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedOption !== null}
                        className={`w-full p-3 sm:p-4 text-left rounded-lg border transition-all duration-200 ease-in-out flex items-center text-sm sm:text-base group
                          ${selectedOption !== null
                            ? index === currentFicheData.quizQuestionsData[currentQuestion].answer
                              ? 'bg-green-50 border-green-500 text-green-800 ring-2 ring-green-400'
                              : index === selectedOption
                                ? 'bg-red-50 border-red-500 text-red-800 ring-2 ring-red-400'
                                : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'
                            : 'bg-white border-slate-300 hover:bg-slate-100 hover:border-slate-400 focus:ring-2 focus:ring-slate-400 focus:ring-offset-1'
                          }`}
                      >
                        <span className="mr-3 flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
                          {selectedOption !== null && index === currentFicheData.quizQuestionsData[currentQuestion].answer && (
                            <Check className="text-green-600" />
                          )}
                          {selectedOption !== null && index === selectedOption && index !== currentFicheData.quizQuestionsData[currentQuestion].answer && (
                            <X className="text-red-600" />
                          )}
                           {selectedOption === null && (
                             <span className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-slate-400 group-hover:border-slate-600 rounded-full transition-colors"></span>
                           )}
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                  {selectedOption !== null && (
                    <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-slate-50 rounded-lg border border-slate-200 animate-fadeIn">
                      <p className="text-slate-700 text-sm sm:text-base font-semibold mb-1">Explication :</p>
                      <p className="text-slate-700 text-sm sm:text-base">{currentFicheData.quizQuestionsData[currentQuestion].explanation}</p>
                      <button
                        onClick={nextQuestion}
                        className="mt-5 w-full py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-base sm:text-lg font-semibold"
                      >
                        {currentQuestion < currentFicheData.quizQuestionsData.length - 1 ? 'Question suivante' : 'Voir les résultats'}
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 text-center shadow-xl animate-fadeIn">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4">Résultats du Quiz</h3>
                  <p className="text-5xl sm:text-6xl font-bold mb-3 text-slate-700">{score}/{currentFicheData.quizQuestionsData.length}</p>
                  <div className="mb-8">
                    <div className="w-full max-w-sm mx-auto bg-slate-200 rounded-full h-4 shadow-inner">
                        <div
                            className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${(score / currentFicheData.quizQuestionsData.length) * 100}%` }}
                        ></div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-base sm:text-lg mb-8">
                    {score === currentFicheData.quizQuestionsData.length
                      ? "🏆 Parfait ! Maîtrise excellente du sujet."
                      : score >= currentFicheData.quizQuestionsData.length * 0.7
                        ? "👍 Bon résultat ! Continuez comme ça."
                        : score >= currentFicheData.quizQuestionsData.length * 0.4
                          ? "📚 Correct. Quelques points à revoir."
                          : "🧐 À approfondir. N'hésitez pas à consulter la fiche mémo et refaire le quiz."}
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="px-8 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 shadow-md hover:shadow-lg text-base sm:text-lg font-semibold flex items-center justify-center gap-2 mx-auto"
                  >
                    <RefreshCw className="h-5 w-5"/>
                    Recommencer
                  </button>
                </div>
              )}
            </section>
          )}

          {activeTab === TabId.Kahoot && currentFicheData.kahootLink && (
            <section className="mb-12 animate-fadeIn p-6 sm:p-8 bg-white border border-slate-200 rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Jouer au Kahoot!</h3>
                <p className="text-slate-700 text-lg mb-4 text-center">Testez vos connaissances avec ce quiz interactif !</p>
                <div className="aspect-w-16 aspect-h-9_sm_kahoot rounded-lg overflow-hidden shadow-lg mx-auto max-w-4xl" style={{height: '550px'}}> {/* Ensure max-w for larger screens */}
                  <iframe
                    src={currentFicheData.kahootLink}
                    title={`Kahoot - ${currentFicheData.title}`}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-slate-500 text-sm mt-4 text-center">Le Kahoot! est intégré ci-dessus. Vous pouvez aussi y jouer directement sur <a href={currentFicheData.kahootLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Kahoot!</a>.</p>
            </section>
          )}

          {activeTab === TabId.Podcast && currentFicheData.podcastLink && (
            <section className="mb-12 animate-fadeIn p-6 sm:p-8 bg-white border border-slate-200 rounded-xl shadow-xl text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Podcast Recommandé</h3>
                <p className="text-slate-700 text-lg mb-6">
                  Écoutez le podcast sur la {currentFicheData.title} pour approfondir vos connaissances :
                </p>
                <a
                  href={currentFicheData.podcastLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Mic className="mr-3 h-6 w-6" />
                  Accéder au Podcast
                  <ExternalLink className="ml-3 h-5 w-5" />
                </a>
                <p className="text-slate-500 text-sm mt-4">Le podcast s'ouvrira dans un nouvel onglet.</p>
            </section>
          )}

          {activeTab === TabId.YouTube && currentFicheData.youtubeVideos && currentFicheData.youtubeVideos.length > 0 && (
            <section className="mb-12 animate-fadeIn p-6 sm:p-8 bg-white border border-slate-200 rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Vidéos YouTube Utiles</h3>
              <div className="space-y-10">
                {currentFicheData.youtubeVideos.map((video, index) => (
                  <div key={index} className="mx-auto max-w-2xl">
                    <h4 className="text-xl font-semibold text-slate-700 mb-3 text-center">{video.title}</h4>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                        <iframe
                          className="w-full h-full"
                          src={video.url}
                          title={`YouTube: ${video.title}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === TabId.Glossary && currentFicheData.glossaryTerms && currentFicheData.glossaryTerms.length > 0 && (
            <section className="mb-12 animate-fadeIn">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Glossaire Médical</h3>
              {isLoadingGlossary ? (
                <div className="flex items-center justify-center p-8 bg-white border border-slate-200 rounded-xl shadow-lg">
                  <RefreshCw className="h-8 w-8 animate-spin text-slate-500 mr-3" />
                  <p className="text-slate-600 text-lg">Chargement du glossaire...</p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xl">
                  {Object.keys(glossaryTermsMap).length > 0 ? (
                    <dl className="space-y-5">
                      {Object.entries(glossaryTermsMap).map(([term, definition]) => (
                        <div key={term} className="border-b border-slate-100 pb-4 last:border-b-0">
                          <dt className="font-semibold text-lg text-slate-700">{term}</dt>
                          <dd className="text-slate-600 text-base mt-1.5 leading-relaxed">{definition}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="text-slate-600 text-center py-4">Aucun terme de glossaire chargé. Cela peut être dû à l'absence de termes pour cette fiche ou à un échec du chargement.</p>
                  )}
                </div>
              )}

              <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xl">
                <h4 className="text-xl font-semibold text-slate-800 mb-4">Expliquer un terme médical</h4>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="text"
                    value={medicalTermInput}
                    onChange={(e) => setMedicalTermInput(e.target.value)}
                    placeholder="Entrez un terme médical..."
                    className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none text-sm"
                  />
                  <button
                    onClick={handleExplainMedicalTerm}
                    disabled={isExplainingTerm || !medicalTermInput.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md flex items-center justify-center gap-2 text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isExplainingTerm ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Explication...
                      </>
                    ) : (
                      <>
                        Expliquer <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
                {medicalExplanation && (
                  <div className={`p-4 rounded-lg animate-fadeIn text-sm sm:text-base ${medicalExplanation.startsWith("Une erreur") ? "bg-red-50 border border-red-200 text-red-800" : "bg-blue-50 border border-blue-200 text-blue-800"}`}>
                    <p className="font-semibold mb-2">Explication pour "{medicalTermInput}" :</p>
                    <p>{medicalExplanation}</p>
                  </div>
                )}
              </div>
            </section>
          )}
          <footer className="mt-12 text-center text-slate-500 text-sm absolute bottom-6 left-0 right-0">
            Mémofiches conseil à l'officine. PharmaConseil. {new Date().getFullYear()}
          </footer>
          <Chatbot memoContent={memoFicheContentForChatbot} ficheTitle={currentFicheData.title} />
        </>
      )}
    </div>
  );
};

export default App;
