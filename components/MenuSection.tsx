
import React from 'react';
import { MenuSection as MenuSectionType, MenuItem } from '../types';

interface Props {
  section: MenuSectionType;
  isFirst?: boolean;
  isAdmin?: boolean;
  onUpdatePrice?: (sectionId: string, itemIdx: number, priceIdx: number, newVal: string) => void;
  onReorder?: (sectionId: string, itemIdx: number, direction: 'up' | 'down') => void;
  onToggleTag?: (sectionId: string, itemIdx: number, tag: 'isPopular' | 'isSpicy') => void;
  onDeleteItem?: (sectionId: string, itemIdx: number) => void;
  onAddItem?: (sectionId: string) => void;
  onEditItem?: (sectionId: string, itemIdx: number, field: string, value: string) => void;
  onEditSection?: (sectionId: string, field: string, value: string) => void;
  onDeleteSection?: (sectionId: string) => void;
}

const MenuSection: React.FC<Props> = ({ 
  section, 
  isFirst, 
  isAdmin, 
  onUpdatePrice, 
  onReorder,
  onToggleTag,
  onDeleteItem,
  onAddItem,
  onEditItem,
  onEditSection,
  onDeleteSection
}) => {
  const isNumeric = (val: string) => /^\d+$/.test(val.trim());
  const isCardLayout = section.id === 'pizza' || section.id === 'grill-corner';

  return (
    <section id={section.id} className="mb-10 scroll-mt-[170px]" aria-labelledby={`${section.id}-heading`}>
      <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl border border-zinc-200 dark:border-white/5 bg-zinc-200 dark:bg-zinc-900 reveal-item group">
        {isAdmin && onEditSection && (
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <input 
              type="text" 
              value={section.image} 
              onChange={e => onEditSection(section.id, 'image', e.target.value)} 
              placeholder="رابط صورة القسم" 
              className="bg-black/50 text-white px-3 py-1.5 rounded-xl text-xs font-bold outline-none backdrop-blur-md border border-white/20 w-48"
            />
          </div>
        )}
        <img
          src={section.image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading={isFirst ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
        {isAdmin && onDeleteSection && (
          <button 
            onClick={() => onDeleteSection(section.id)}
            className="absolute top-4 left-4 bg-red-600/80 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl backdrop-blur-md transition-all shadow-lg text-xs font-black z-20"
          >
            حذف القسم
          </button>
        )}
        <div className="absolute bottom-6 right-6 left-6 md:bottom-8 md:right-8 md:left-8 text-right">
          <div className="flex flex-col gap-2">
            <span className="text-red-500 font-black text-[11px] tracking-[0.2em] uppercase">فئة القائمة</span>
            <div className="flex items-center gap-3 justify-end">
              {isAdmin && onEditSection ? (
                <>
                  <input 
                    type="text" 
                    value={section.emoji} 
                    onChange={e => onEditSection(section.id, 'emoji', e.target.value)} 
                    className="w-12 bg-black/40 text-white rounded-lg text-center text-3xl outline-none border border-white/10" 
                  />
                  <input 
                    type="text" 
                    value={section.title} 
                    onChange={e => onEditSection(section.id, 'title', e.target.value)} 
                    className="w-full max-w-[200px] bg-black/40 text-white rounded-lg px-2 py-1 text-3xl font-black outline-none text-right border border-white/10" 
                  />
                </>
              ) : (
                <>
                  <span className="text-3xl leading-none animate-emoji">{section.emoji}</span>
                  <h2 id={`${section.id}-heading`} className="text-3xl font-black text-white leading-none">{section.title}</h2>
                </>
              )}
            </div>
            {isAdmin && onEditSection ? (
                <input 
                  type="text" 
                  value={section.description || ''} 
                  placeholder="وصف القسم (اختياري)" 
                  onChange={e => onEditSection(section.id, 'description', e.target.value)} 
                  className="w-full max-w-[300px] bg-black/40 text-white text-[12px] font-bold px-3 py-1.5 rounded-full outline-none text-right self-end border border-white/10" 
                />
            ) : (
                section.description && (
                  <p className="text-white/80 text-[12px] font-bold mt-1 bg-red-600/40 px-3 py-1 rounded-full inline-block backdrop-blur-sm self-end">
                    {section.description}
                  </p>
                )
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 border border-zinc-200 dark:border-white/10 shadow-xl reveal-item">
        <div className={isCardLayout ? "grid grid-cols-1 gap-4" : "divide-y divide-zinc-100 dark:divide-white/5"}>
          {section.items.map((item, idx) => (
            <div 
              key={idx} 
              className={
                isCardLayout
                ? `relative p-5 rounded-[2rem] border border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02]`
                : `py-5 flex items-start justify-between gap-4 group transition-all -mx-4 px-4 rounded-3xl border border-transparent`
              }
            >
              {/* Controls (Admin Only) */}
              {isAdmin && (
                <div className={`z-10 ${isCardLayout ? 'flex justify-end mb-3 gap-2' : 'flex items-center gap-2 shrink-0 pt-2'}`}>
                  {isCardLayout ? (
                     <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 p-1 rounded-xl shadow-sm border border-zinc-200 dark:border-white/10" onClick={e => e.stopPropagation()}>
                        <button onClick={(e) => { e.stopPropagation(); onReorder?.(section.id, idx, 'up'); }} className="p-1.5 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg hover:bg-red-600 hover:text-white transition-all text-[10px]">▲</button>
                        <button onClick={(e) => { e.stopPropagation(); onReorder?.(section.id, idx, 'down'); }} className="p-1.5 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg hover:bg-red-600 hover:text-white transition-all text-[10px]">▼</button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onDeleteItem?.(section.id, idx); }}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all"
                        >
                          ✕
                        </button>
                     </div>
                  ) : (
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-1">
                          <button onClick={(e) => { e.stopPropagation(); onReorder?.(section.id, idx, 'up'); }} className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-red-600 hover:text-white transition-all text-[10px]">▲</button>
                          <button onClick={(e) => { e.stopPropagation(); onReorder?.(section.id, idx, 'down'); }} className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-red-600 hover:text-white transition-all text-[10px]">▼</button>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onDeleteItem?.(section.id, idx); }}
                          className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                  )}
                </div>
              )}

              {/* Layout Logic */}
              {isCardLayout ? (
                <div className="flex flex-col items-start w-full">
                   {/* Header - Adjusted for RTL (justify-start = Right) */}
                   <div className="flex items-center gap-2 mb-1 justify-start w-full text-right">
                         {isAdmin && onEditItem ? (
                           <input 
                             type="text" 
                             value={item.name} 
                             onChange={e => onEditItem(section.id, idx, 'name', e.target.value)} 
                             onClick={e => e.stopPropagation()}
                             className="text-zinc-900 dark:text-zinc-100 font-black text-xl leading-tight text-right bg-transparent border-b border-zinc-300/50 dark:border-white/20 outline-none w-full" 
                           />
                         ) : (
                           <h3 className="text-zinc-900 dark:text-zinc-100 font-black text-xl leading-tight text-right">{item.name}</h3>
                         )}
                         {/* Badges */}
                         <div className="flex items-center gap-1">
                             {isAdmin ? (
                               <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg" onClick={e => e.stopPropagation()}>
                                 <button onClick={(e) => { e.stopPropagation(); onToggleTag?.(section.id, idx, 'isPopular'); }} className={`p-1 rounded ${item.isPopular ? 'bg-red-500 text-black' : 'text-zinc-400'}`}>⭐</button>
                                 <button onClick={(e) => { e.stopPropagation(); onToggleTag?.(section.id, idx, 'isSpicy'); }} className={`p-1 rounded ${item.isSpicy ? 'bg-red-500 text-white' : 'text-zinc-400'}`}>🌶️</button>
                               </div>
                             ) : (
                               <>
                                 {item.isPopular && <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-lg animate-popular shadow-sm shadow-red-500/20">مميز</span>}
                                 {item.isSpicy && <span className="animate-spicy text-sm leading-none">🌶️</span>}
                               </>
                             )}
                         </div>
                   </div>
                   
                   {isAdmin && onEditItem ? (
                     <textarea
                       value={item.description || ''}
                       onChange={e => onEditItem(section.id, idx, 'description', e.target.value)}
                       onClick={e => e.stopPropagation()}
                       placeholder="وصف الصنف"
                       className="text-[11px] text-zinc-500 dark:text-zinc-400 font-bold leading-relaxed text-right w-full opacity-80 bg-transparent border-b border-zinc-300/50 dark:border-white/20 outline-none mt-1 resize-none"
                       rows={2}
                     />
                   ) : (
                     item.description && <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-bold leading-relaxed text-right w-full opacity-80">{item.description}</p>
                   )}

                   {/* Prices (Card Grid) */}
                   <div className={`grid gap-2 w-full pt-2 mt-3 border-t border-zinc-200/50 dark:border-white/5 ${item.prices.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                      {item.prices.map((price, pIdx) => (
                        <div key={pIdx} className="flex flex-col items-center justify-center bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5 rounded-xl p-2.5 shadow-sm transition-colors">
                           <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-tight mb-1">
                             {item.labels?.[pIdx] || section.subtitles?.[pIdx]}
                           </span>
                           {isAdmin && onUpdatePrice ? (
                             <input 
                              type="text" value={price} onClick={e => e.stopPropagation()}
                              onChange={e => onUpdatePrice(section.id, idx, pIdx, e.target.value)}
                              className="w-full bg-transparent text-center font-black text-red-600 outline-none"
                             />
                           ) : (
                             <div className="flex items-baseline gap-0.5">
                               <span className="text-red-600 font-black text-lg leading-none">{price}</span>
                               <span className="text-[9px] text-zinc-400 font-bold">ج</span>
                             </div>
                           )}
                        </div>
                      ))}
                   </div>
                </div>
              ) : (
                /* Standard Layout for other sections */
                <>
                  <div className="flex flex-col gap-1 flex-1 min-w-0 text-right pr-2">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <div className="flex items-center gap-1.5 order-1">
                        {isAdmin ? (
                          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                            <button 
                              onClick={(e) => { e.stopPropagation(); onToggleTag?.(section.id, idx, 'isPopular'); }}
                              className={`p-1 rounded-md transition-all ${item.isPopular ? 'bg-red-500 text-black shadow-sm' : 'text-zinc-400'}`}
                            >
                              <span className="text-xs">⭐</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); onToggleTag?.(section.id, idx, 'isSpicy'); }}
                              className={`p-1 rounded-md transition-all ${item.isSpicy ? 'bg-red-500 text-white shadow-sm' : 'text-zinc-400'}`}
                            >
                              <span className="text-xs">🌶️</span>
                            </button>
                          </div>
                        ) : (
                          <>
                            {item.isPopular && <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-lg animate-popular">مميز</span>}
                            {item.isSpicy && <span className="animate-spicy text-sm leading-none">🌶️</span>}
                          </>
                        )}
                      </div>
                      {isAdmin && onEditItem ? (
                        <input 
                          type="text" 
                          value={item.name} 
                          onChange={e => onEditItem(section.id, idx, 'name', e.target.value)} 
                          onClick={e => e.stopPropagation()}
                          className="text-zinc-900 dark:text-zinc-100 font-black text-lg leading-snug transition-colors order-2 text-right w-full max-w-[200px] bg-transparent border-b border-zinc-300/50 dark:border-white/20 outline-none" 
                        />
                      ) : (
                        <span className="text-zinc-900 dark:text-zinc-100 font-black text-lg leading-snug transition-colors order-2 text-right w-full">
                          {item.name}
                        </span>
                      )}
                    </div>
                    
                    {isAdmin && onEditItem ? (
                      <textarea
                        value={item.description || ''}
                        onChange={e => onEditItem(section.id, idx, 'description', e.target.value)}
                        onClick={e => e.stopPropagation()}
                        placeholder="وصف الصنف"
                        className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed bg-transparent border-b border-zinc-300/50 dark:border-white/20 outline-none w-full resize-none mt-1"
                        rows={2}
                      />
                    ) : (
                      item.description && (
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                          {item.description}
                        </p>
                      )
                    )}
                  </div>
                  
                  <div className="flex gap-2 md:gap-4 items-start shrink-0 pt-0.5 flex-wrap justify-end max-w-[40%]">
                    {item.prices.map((price, pIdx) => (
                      <div key={pIdx} className="flex flex-col items-center gap-1">
                        {item.labels && item.labels[pIdx] && (
                          <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-tighter">
                            {item.labels[pIdx]}
                          </span>
                        )}
                        <div className={`px-2.5 py-1.5 min-w-[50px] rounded-xl border transition-all flex items-center justify-center gap-1 shadow-sm
                          ${isAdmin 
                            ? 'bg-red-600/10 border-red-600/30' 
                            : 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200 dark:border-white/5'
                          }`}
                        >
                            {isAdmin && onUpdatePrice ? (
                              <input 
                                type="text" 
                                value={price} 
                                onClick={e => e.stopPropagation()}
                                onChange={e => onUpdatePrice(section.id, idx, pIdx, e.target.value)}
                                className="w-12 bg-transparent text-center font-black text-red-600 outline-none"
                              />
                            ) : (
                              <>
                                {isNumeric(price) ? (
                                  <>
                                    <span className="text-red-600 font-black text-lg leading-none">{price}</span>
                                    <span className="text-[9px] text-zinc-500 mr-0.5 font-black">ج</span>
                                  </>
                                ) : (
                                  <span className="text-red-600 font-black text-[10px] text-center leading-tight">{price}</span>
                                )}
                              </>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}

          {isAdmin && onAddItem && (
            <div className="pt-4">
              <button 
                onClick={() => onAddItem(section.id)}
                className="w-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-black text-sm py-3 rounded-[1.5rem] transition-colors border border-dashed border-zinc-300 dark:border-zinc-600 flex justify-center items-center gap-2 shadow-sm"
              >
                <span className="text-xl leading-none">+</span>
                إضافة صنف جديد
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
