
import React from 'react';
import { memoFichesData } from '../constants';
import { MemoFiches } from '../types';

interface LandingPageProps {
  onSelectFiche: (ficheId: string) => void;
  completionProgress: Record<string, number>;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectFiche, completionProgress }) => {
  return (
    <div className="animate-fadeIn">
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">Santé féminine</h1>
        <p className="text-lg sm:text-xl text-slate-600 mt-3">Mémofiches Conseils à l'officine</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {Object.keys(memoFichesData).map((ficheId) => {
          const fiche = (memoFichesData as MemoFiches)[ficheId];
          const progress = completionProgress[ficheId] || 0;
          return (
            <div 
              key={ficheId} 
              className="bg-white border border-slate-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col overflow-hidden group transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={fiche.image}
                  alt={`Illustration pour ${fiche.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/600x400/CCCCCC/333333?text=Image+Indisponible';
                  }}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-slate-800 mb-3">{fiche.title}</h3>
                <div className="mt-auto">
                  <button
                    onClick={() => onSelectFiche(ficheId)}
                    className="w-full px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 focus:ring-4 focus:ring-slate-300 transition-all duration-300 transform hover:scale-105"
                  >
                    Commencer la formation
                  </button>
                  <div className="mt-5">
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                        <span>Progression</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className="bg-slate-700 h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <footer className="mt-16 text-center text-slate-500 text-sm">
        Mémofiches conseil à l'officine. PharmaConseil. {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default LandingPage;
