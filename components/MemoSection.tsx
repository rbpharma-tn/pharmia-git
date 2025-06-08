
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MemoItem } from '../types';

interface MemoSectionProps {
  item: MemoItem;
  sectionKey: string;
  expandedSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
  highlightTextWithGlossary: (text: string) => React.ReactNode;
  level?: number;
}

const MemoSection: React.FC<MemoSectionProps> = ({
  item,
  sectionKey,
  expandedSections,
  toggleSection,
  highlightTextWithGlossary,
  level = 0,
}) => {
  const isExpanded = !!expandedSections[sectionKey];
  const paddingLeft = level * 1.5 + 'rem'; // 24px per level

  const isCollapsible = item.type === "section";

  const containerClasses = `bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg transition-shadow hover:shadow-xl ${level > 0 ? 'mt-3' : ''}`;

  return (
    <div className={containerClasses} style={level > 0 ? { marginLeft: paddingLeft } : {}}>
      {isCollapsible ? (
        <button
          className="w-full p-4 sm:p-5 text-left flex justify-between items-center hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
          onClick={() => toggleSection(sectionKey)}
          aria-expanded={isExpanded}
        >
          <span className="font-semibold text-lg text-slate-700">{item.title}</span>
          {isExpanded ? <ChevronUp className="h-6 w-6 text-slate-500" /> : <ChevronDown className="h-6 w-6 text-slate-500" />}
        </button>
      ) : (
        item.title && ( // Render title only if it exists (for type: "text" which might just be content)
            <div className="w-full p-4 sm:p-5 text-left">
                <span className="font-semibold text-lg text-slate-700">{item.title}</span>
            </div>
        )
      )}

      {(isExpanded || !isCollapsible) && (
        <div className={`p-4 sm:p-5 bg-white whitespace-pre-line text-slate-700 ${isCollapsible ? 'border-t border-slate-200' : ''} text-sm sm:text-base leading-relaxed`}>
          {item.title === "Références bibliographiques" ? (
            <p className="text-xs sm:text-sm text-slate-600">
              {highlightTextWithGlossary(item.content)}
            </p>
          ) : (
            item.content && highlightTextWithGlossary(item.content)
          )}
          {item.children && item.children.length > 0 && (
            <div className="mt-4 space-y-3">
              {item.children.map((childItem, childIndex) => (
                <MemoSection
                  key={`${sectionKey}-${childIndex}`}
                  item={childItem}
                  sectionKey={`${sectionKey}-${childIndex}`}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  highlightTextWithGlossary={highlightTextWithGlossary}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemoSection;
