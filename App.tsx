
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import Logo from './components/Logo';
import { MENU_DATA, PIZZA_FATAYER_ADDITIONS, CREPE_ADDITIONS } from './constants';
import { MenuSection as MenuSectionType, AdditionGroup } from './types';

const ADMIN_PASSWORD = "Ezzelsham1";
const MAPS_LINK = "https://www.google.com/maps/place/%D9%85%D8%B7%D8%B9%D9%85+%D8%B9%D8%B2+%D8%A7%D9%84%D8%B3%D9%88%D8%B1%D9%8A%E2%80%AD/@29.8904277,31.2721567,15z/data=!4m23!1m16!4m15!1m6!1m2!1s0x1458372ef179fca9:0x69a78c97668972c8!2z2YXYt9i52YUg2LnYsiDYp9mE2LTYp9mFINin2YTYs9mI2LHZiiwgVjdXOCtGMkfYjCDZhdiv2YrZhtipINin2YTYrdmI2KfZhdiv2YrYqdiMIEVsIEhhd2FtZGV5YSw Giza Gov 3374340!2m2!1d31.2650909!2d29.8961858!1m6!1m2!1s0x1458372ef179fca9:0x69a78c97668972c8!2z2YXYt9i52YUg2LnYsiDYp9mE2LTYp9mFINin2YTYs9mI2LHZiiwgVjdXOCtGMkfYjCDZhdiv2YrZhtipINin2YTYrdmI2KfZhdiv2YrYqdiMIEVsIEhhd2FtZGV5YSw Giza Gov 3374340!2m2!1d31.2650909!2d29.8961858!3e3!3m5!1s0x1458372ef179fca9:0x69a78c97668972c8!8m2!3d29.8961858!4d31.2650909!16s%2Fg%2F11j7zrb_58?entry=ttu&g_ep=EgoyMDI2MDEyMC4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D";

const PHONE_NUMBERS = [
  { label: "موبايل 1", number: "01006678574" },
  { label: "موبايل 2", number: "01091631909" },
  { label: "موبايل 3", number: "01147687757" },
  { label: "موبايل 4", number: "01111199851" }
];

const AtyabLogo = ({ size = "w-16 h-16", src, onUpload, isAdmin }: { size?: string, src?: string, onUpload?: (url: string) => void, isAdmin?: boolean }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUpload) return;

    try {
      setIsUploading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: `logo-${Date.now()}-${file.name}`,
            base64Data,
            contentType: file.type,
          }),
        });

        if (!response.ok) throw new Error('Upload failed');
        const data = await response.json();
        if (data.url) onUpload(data.url);
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('حدث خطأ أثناء رفع الصورة');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative group">
      <div className={`${size} relative flex items-center justify-center overflow-hidden rounded-full border-[3px] border-red-600 shadow-md bg-white dark:bg-zinc-900 mb-4 transform transition-all duration-700 hover:rotate-6 active:scale-95 cursor-pointer p-1`}>
        <Logo src={src} />
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          </div>
        )}
      </div>
      {isAdmin && onUpload && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="bg-red-600 text-white px-2 py-1 rounded-lg text-[10px] font-black shadow-lg whitespace-nowrap">
            تغيير اللوجو
          </button>
        </div>
      )}
    </div>
  );
};

const MenuIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6H20M9 12H20M9 18H20M5 6V6.01M5 12V12.01M5 18V18.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Unique Storage keys for this specific menu to prevent mix-ups
const STORAGE_KEYS = {
  MENU: 'ezz_elsham_exclusive_data_v2',
  ADDITIONS_PIZZA: 'ezz_elsham_exclusive_additions_pizza_v2',
  ADDITIONS_CREPE: 'ezz_elsham_exclusive_additions_crepe_v2'
};

export const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [isServerConnected, setIsServerConnected] = useState(false);
  
  const [menuData, setMenuData] = useState<MenuSectionType[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MENU);
    return saved ? JSON.parse(saved) : MENU_DATA;
  });

  const [additionsPizza, setAdditionsPizza] = useState<AdditionGroup>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ADDITIONS_PIZZA);
    return saved ? JSON.parse(saved) : PIZZA_FATAYER_ADDITIONS;
  });

  const [additionsCrepe, setAdditionsCrepe] = useState<AdditionGroup>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ADDITIONS_CREPE);
    return saved ? JSON.parse(saved) : CREPE_ADDITIONS;
  });

  const [logoUrl, setLogoUrl] = useState<string>('');

  const [activeSection, setActiveSection] = useState<string>('');
  const [showBottomCallMenu, setShowBottomCallMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const navRef = useRef<HTMLDivElement>(null);
  const isManualScrolling = useRef(false);

  // Sync with Server (Vercel KV)
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch('/api/menu');
        if (response.ok) {
          const data = await response.json();
          if (data.menuData) setMenuData(data.menuData);
          if (data.additionsPizza) setAdditionsPizza(data.additionsPizza);
          if (data.additionsCrepe) setAdditionsCrepe(data.additionsCrepe);
          if (data.logoUrl) setLogoUrl(data.logoUrl);
          setIsServerConnected(true);
        }
      } catch (error) {
        console.error("Server read failed:", error);
      }
    };

    fetchMenuData();
  }, []);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-180px 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrolling.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    menuData.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [menuData]);

  useEffect(() => {
    if (activeSection && navRef.current) {
      const activeButton = navRef.current.querySelector(`[data-section-id="${activeSection}"]`);
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeSection]);

  const triggerHaptic = (pattern: number | number[] = 10) => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    triggerHaptic(10);
    setShowCategoriesMenu(false);
    setShowBottomCallMenu(false);
    const target = document.getElementById(id);
    if (target) {
      isManualScrolling.current = true;
      setActiveSection(id);
      const offset = 170;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'auto' });
      setTimeout(() => { isManualScrolling.current = false; }, 100);
    }
  };

  const scrollNav = (direction: 'left' | 'right') => {
    if (navRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      navRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      triggerHaptic(5);
    }
  };

  const handleLogin = () => {
    if (passInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
      setPassInput("");
      triggerHaptic(30);
    } else {
      alert("⚠️ كلمة السر غير صحيحة");
      triggerHaptic([50, 50, 50]);
    }
  };

  const handleUpdatePrice = (sectionId: string, itemIdx: number, priceIdx: number, newVal: string) => {
    if (sectionId === 'additions-pizza') {
      const updated = { ...additionsPizza };
      updated.items[itemIdx].prices[priceIdx] = newVal;
      setAdditionsPizza(updated);
      return;
    }
    if (sectionId === 'additions-crepe') {
      const updated = { ...additionsCrepe };
      updated.items[itemIdx].prices[priceIdx] = newVal;
      setAdditionsCrepe(updated);
      return;
    }

    const updated = [...menuData];
    const sectionIdx = updated.findIndex(s => s.id === sectionId);
    if (sectionIdx > -1) {
      updated[sectionIdx].items[itemIdx].prices[priceIdx] = newVal;
      setMenuData(updated);
    }
  };

  const handleToggleTag = (sectionId: string, itemIdx: number, tag: 'isPopular' | 'isSpicy') => {
    const updated = [...menuData];
    const sectionIdx = updated.findIndex(s => s.id === sectionId);
    if (sectionIdx > -1) {
      const currentVal = updated[sectionIdx].items[itemIdx][tag];
      updated[sectionIdx].items[itemIdx][tag] = !currentVal;
      setMenuData(updated);
      triggerHaptic(10);
    }
  };

  const handleDeleteItem = (sectionId: string, itemIdx: number) => {
    const updated = [...menuData];
    const sectionIdx = updated.findIndex(s => s.id === sectionId);
    if (sectionIdx > -1) {
      updated[sectionIdx].items.splice(itemIdx, 1);
      setMenuData(updated);
      triggerHaptic([20, 10, 20]);
    }
  };

  const handleReorderItems = (sectionId: string, itemIdx: number, direction: 'up' | 'down') => {
    const updated = [...menuData];
    const sectionIdx = updated.findIndex(s => s.id === sectionId);
    if (sectionIdx > -1) {
      const items = [...updated[sectionIdx].items];
      if (direction === 'up' && itemIdx > 0) {
        [items[itemIdx], items[itemIdx - 1]] = [items[itemIdx - 1], items[itemIdx]];
      } else if (direction === 'down' && itemIdx < items.length - 1) {
        [items[itemIdx], items[itemIdx + 1]] = [items[itemIdx + 1], items[itemIdx]];
      }
      updated[sectionIdx].items = items;
      setMenuData(updated);
      triggerHaptic(5);
    }
  };

  const handleUpdateImage = (sectionId: string, newImageUrl: string) => {
    const updated = [...menuData];
    const sectionIdx = updated.findIndex(s => s.id === sectionId);
    if (sectionIdx > -1) {
      updated[sectionIdx].image = newImageUrl;
      setMenuData(updated);
      triggerHaptic(10);
    }
  };

  const saveMenuChanges = async () => {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuData));
    localStorage.setItem(STORAGE_KEYS.ADDITIONS_PIZZA, JSON.stringify(additionsPizza));
    localStorage.setItem(STORAGE_KEYS.ADDITIONS_CREPE, JSON.stringify(additionsCrepe));

    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          menuData,
          additionsPizza,
          additionsCrepe,
          logoUrl,
        }),
      });

      if (response.ok) {
        alert("✅ تم حفظ التعديلات على السيرفر (جميع الأجهزة)");
      } else {
        throw new Error('Server returned an error');
      }
    } catch (err: any) {
      alert("⚠️ حدث خطأ أثناء الحفظ على السيرفر: " + err.message);
    }
    
    setIsAdmin(false);
    triggerHaptic(50);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-zinc-200 antialiased selection:bg-red-500/30">
      <Header isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} onAction={() => triggerHaptic()} />
      
      {isAdmin && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[55] bg-red-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-slide-up border border-black/10">
          <span className="font-black text-xs uppercase tracking-widest">وضع التعديل نشط</span>
          {isServerConnected ? (
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#4ade80]"></span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-yellow-400" title="جاري الاتصال..."></span>
          )}
          <button onClick={saveMenuChanges} className="bg-black text-white px-4 py-1.5 rounded-full font-black text-[10px] active:scale-95 shadow-lg">حفظ التغييرات</button>
          <button onClick={() => setIsAdmin(false)} className="bg-white/20 px-4 py-1.5 rounded-full font-black text-[10px] active:scale-95">إلغاء</button>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowLogin(false)}>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-2xl w-80 animate-slide-up border border-white/10" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-black text-center mb-6 text-zinc-900 dark:text-white">تسجيل دخول المدير</h3>
            <input 
              type="password" 
              value={passInput}
              onChange={e => setPassInput(e.target.value)}
              placeholder="كلمة السر"
              className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 mb-4 text-center font-bold outline-none focus:border-red-600 transition-colors"
              autoFocus
            />
            <button onClick={handleLogin} className="w-full bg-red-600 text-white font-black py-3 rounded-xl hover:bg-red-700 active:scale-95 transition-all shadow-lg">دخول</button>
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-40 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 shadow-sm">
        <div className="max-w-2xl mx-auto relative flex items-center group">
          <button onClick={() => scrollNav('right')} className="absolute right-0 z-10 w-10 h-full bg-gradient-to-l from-white dark:from-[#050505] to-transparent flex items-center justify-center text-zinc-400 active:text-red-600 transition-all">
            <span className="text-xl rotate-180">‹</span>
          </button>
          <div ref={navRef} className="flex gap-2 overflow-x-auto no-scrollbar px-10 py-4 scroll-smooth">
            {menuData.map((item) => (
              <button
                key={item.id}
                data-section-id={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-2xl text-[12px] font-black border transition-all duration-300 ${
                  activeSection === item.id 
                  ? 'bg-red-600 text-white border-red-500 scale-105 shadow-lg shadow-red-600/20' 
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 text-zinc-500 hover:border-red-500/30'
                }`}
              >
                <span className="animate-emoji">{item.emoji || '✨'}</span> {item.title}
              </button>
            ))}
          </div>
          <button onClick={() => scrollNav('left')} className="absolute left-0 z-10 w-10 h-full bg-gradient-to-r from-white dark:from-[#050505] to-transparent flex items-center justify-center text-zinc-400 active:text-red-600 transition-all">
            <span className="text-xl">‹</span>
          </button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-5 py-8 pb-32">
        <div className="mb-8 rounded-[1.5rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-6 relative overflow-hidden text-right shadow-md reveal-item">
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-1 leading-none italic uppercase tracking-tighter">EZZ EL SHAM</h2>
            <p className="text-red-600 dark:text-red-500 text-[10px] font-black uppercase mb-2 tracking-widest">أشهى المأكولات السورية</p>
            <div className="flex flex-col gap-1 text-zinc-400 dark:text-zinc-500 text-[9px] font-bold">
              <span>📍 الحوامدية - السهران - أسفل مسجد الصفا</span>
              <span>📍 أمام الشهر العقاري</span>
            </div>
          </div>
          <div className="absolute -left-4 -bottom-4 text-[80px] opacity-[0.03] rotate-12 animate-emoji">🌯</div>
        </div>

        {menuData.map((section) => (
          <MenuSection 
            key={section.id} 
            section={section} 
            isAdmin={isAdmin}
            onUpdatePrice={handleUpdatePrice}
            onReorder={handleReorderItems}
            onToggleTag={handleToggleTag}
            onDeleteItem={handleDeleteItem}
            onUpdateImage={handleUpdateImage}
          />
        ))}

        {isAdmin && (
          <div className="space-y-10 mt-10 animate-slide-up">
            <div className="bg-zinc-100 dark:bg-zinc-800/50 p-6 rounded-[2rem] border-2 border-dashed border-red-600/30">
               <h3 className="text-center font-black text-red-600 mb-6 uppercase tracking-widest text-sm">تعديل أسعار الإضافات</h3>
               <MenuSection 
                 section={additionsPizza as any} 
                 isAdmin={isAdmin} 
                 onUpdatePrice={handleUpdatePrice} 
               />
               <div className="h-10"></div>
               <MenuSection 
                 section={additionsCrepe as any} 
                 isAdmin={isAdmin} 
                 onUpdatePrice={handleUpdatePrice} 
               />
            </div>
          </div>
        )}

        <footer className="mt-16 pb-12 flex flex-col items-center gap-10 reveal-item">
            <div className="w-full bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 shadow-xl border border-zinc-200 dark:border-white/10 flex flex-col items-center gap-8 text-center">
               <AtyabLogo size="w-20 h-20" src={logoUrl} onUpload={setLogoUrl} isAdmin={isAdmin} />
               <div className="flex flex-col items-center gap-4">
                  <div className="relative p-4 bg-white rounded-[2rem] border-4 border-zinc-50 dark:border-zinc-800 shadow-2xl">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}`} alt="QR Code" className="w-44 h-44 md:w-52 md:h-52" />
                  </div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">امسح الكود لمشاركة المنيو</p>
               </div>
               <div className="w-full border-t border-zinc-100 dark:border-white/5 pt-8 space-y-4">
                  <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group transition-transform active:scale-95">
                    <span className="text-3xl mb-2 animate-emoji">📍</span>
                    <h4 className="text-xl font-black text-zinc-900 dark:text-white group-hover:text-red-600 transition-colors leading-none">موقعنا على الخريطة</h4>
                    <p className="text-sm font-bold text-zinc-500 mt-2">عز الشام - الحوامدية</p>
                  </a>
               </div>
            </div>

            <div className="flex flex-col items-center gap-4 opacity-60 hover:opacity-100 transition-opacity text-center px-6">
               <div className="flex flex-col items-center gap-1.5">
                  <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">تصميم وتنفيذ مهندس / احمد النقيب</p>
                  <a href="tel:01092621367" className="text-[10px] font-black text-red-600 dark:text-red-500 tracking-wider tabular-nums">للتواصل 01092621367</a>
               </div>
               <button onClick={() => { triggerHaptic(); setShowLogin(true); }} className="text-[9px] font-black text-zinc-400 border border-zinc-200 dark:border-white/10 px-4 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">إدارة المنيو</button>
            </div>
            <div className="h-20"></div> {/* Extra space for fixed bottom nav */}
        </footer>
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-white/10 px-6 py-2 flex justify-between items-end pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <button onClick={() => { setShowBottomCallMenu(!showBottomCallMenu); setShowCategoriesMenu(false); }} className={`flex-1 flex flex-col items-center py-2 active:scale-90 transition-all ${showBottomCallMenu ? 'text-red-600' : 'text-zinc-500'}`}>
            <span className="text-xl animate-emoji">📞</span>
            <span className="text-[8px] font-black text-zinc-400 mt-0.5">اتصال</span>
          </button>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-red-600 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg -mt-10 border-4 border-white dark:border-[#050505] active:scale-90 z-[63] transition-all">
            <span className="text-lg animate-emoji">🔝</span>
          </button>
          <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center py-2 text-zinc-500 active:scale-90 transition-transform">
            <span className="text-xl animate-emoji">📍</span>
            <span className="text-[8px] font-black text-zinc-400 mt-0.5">الموقع</span>
          </a>
          <button onClick={() => { setShowCategoriesMenu(!showCategoriesMenu); setShowBottomCallMenu(false); }} className={`flex-1 flex flex-col items-center py-2 active:scale-90 transition-all ${showCategoriesMenu ? 'text-red-600' : 'text-zinc-500'}`}>
            <MenuIcon className="w-6 h-6 animate-emoji" />
            <span className="text-[8px] font-black text-zinc-400 mt-0.5">المنيو</span>
          </button>
      </div>

      {/* Call Menu Popup */}
      {showBottomCallMenu && (
        <>
          <div className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-sm" onClick={() => setShowBottomCallMenu(false)}></div>
          <div className="fixed bottom-24 left-4 right-4 z-[70] bg-white dark:bg-zinc-900 rounded-[2rem] p-0 shadow-2xl animate-slide-up border border-zinc-200 dark:border-white/10 overflow-hidden">
             <div className="bg-zinc-50 dark:bg-white/5 p-4 text-center border-b border-zinc-100 dark:border-white/5">
                <h3 className="font-black text-zinc-900 dark:text-white">أرقام التوصيل</h3>
             </div>
             {PHONE_NUMBERS.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.number}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-white/5 border-b last:border-0 border-zinc-100 dark:border-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                     <span className="w-2 h-2 rounded-full bg-red-600"></span>
                     <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">{phone.label}</span>
                  </div>
                  <span className="font-black text-2xl text-zinc-900 dark:text-white tabular-nums tracking-tighter" dir="ltr">{phone.number}</span>
                </a>
             ))}
          </div>
        </>
      )}

      {/* Categories Menu Popup */}
      {showCategoriesMenu && (
        <>
          <div className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-sm" onClick={() => setShowCategoriesMenu(false)}></div>
          <div className="fixed bottom-24 left-4 right-4 z-[70] bg-white dark:bg-zinc-900 rounded-[2rem] p-6 shadow-2xl animate-slide-up border border-zinc-200 dark:border-white/10 max-h-[60vh] overflow-y-auto no-scrollbar">
             <h3 className="text-center font-black text-zinc-900 dark:text-white mb-4 text-lg">أقسام المنيو</h3>
             <div className="grid grid-cols-2 gap-3">
               {menuData.map(item => (
                 <button 
                   key={item.id}
                   onClick={(e) => handleNavClick(e, item.id)}
                   className={`p-3 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 ${activeSection === item.id ? 'border-red-600 bg-red-50 text-red-600 dark:bg-red-900/20' : 'border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300'}`}
                 >
                   <span className="text-lg animate-emoji">{item.emoji}</span>
                   <span>{item.title}</span>
                 </button>
               ))}
             </div>
          </div>
        </>
      )}
    </div>
  );
};

export const AppWrapper = App;
