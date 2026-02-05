
import React, { useState } from 'react';
import Logo from './Logo';

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
  onAction?: () => void;
}

const AtyabLogo = ({ size = "w-16 h-16" }: { size?: string }) => (
  <div className={`${size} relative flex items-center justify-center overflow-hidden rounded-full border-2 border-red-600 shadow-xl bg-white dark:bg-zinc-900 transition-transform group-hover:rotate-12 duration-500 p-1`}>
    <Logo />
  </div>
);

const Header: React.FC<Props> = ({ isDark, onToggleTheme, onAction }) => {
  const [showCallMenu, setShowCallMenu] = useState(false);
  const phoneNumbers = [
    { label: " ", number: "01006678574", color: "#dc2626" },
    { label: " ", number: "01091631909", color: "#dc2626" },
    { label: " ", number: "01147687757", color: "#dc2626" },
    { label: " ", number: "01111199851", color: "#dc2626" }
  ];

  const handleCallClick = () => {
    onAction?.();
    setShowCallMenu(!showCallMenu);
  };

  const facebookLink = "https://www.facebook.com/Azaaelsham?mibextid=wwXIfr&rdid=duWbV60jZcdVXEzP&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AUyid8LpZ%2F%3Fmibextid%3DwwXIfr#";

  return (
    <header className="relative z-50 bg-white dark:bg-[#050505] border-b border-zinc-200 dark:border-white/10 pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-2xl mx-auto px-5 py-4 md:py-6 text-right">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onAction}>
            <div className="relative transform group-hover:scale-105 transition-transform duration-300">
               <AtyabLogo />
               <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none italic uppercase -mb-1">
                Ezz El Sham
              </h1>
              <span className="text-red-600 dark:text-red-500 text-[11px] font-black uppercase tracking-[0.1em] mt-1">
                عز الشام - أشهى المأكولات السورية
              </span>
            </div>
          </div>

          <button
            onClick={onToggleTheme}
            className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl transition-all active:scale-90 border border-zinc-200 dark:border-white/10 shadow-sm"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="flex w-full gap-2 relative">
          <div className="flex-[1.2] relative">
            <button
              onClick={handleCallClick}
              className={`w-full font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.96] shadow-xl text-[13px] border ${showCallMenu ? 'bg-zinc-900 text-white border-zinc-800' : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-zinc-200 dark:border-white/10'}`}
            >
              <span className="text-lg" aria-hidden="true">📞</span>
              <span>اتصل بنا</span>
            </button>
            
            {showCallMenu && (
              <>
                <div className="fixed inset-0 z-[-1] bg-black/40 backdrop-blur-[4px]" onClick={() => setShowCallMenu(false)}></div>
                <div className="absolute top-full mt-3 left-0 right-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[1.5rem] shadow-2xl overflow-hidden animate-slide-up z-50">
                  <div className="px-4 py-2 bg-zinc-50 dark:bg-white/5 border-b border-zinc-100 dark:border-white/5">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">خطوط الطلبات</span>
                  </div>
                  {phoneNumbers.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.number}`}
                      onClick={() => setShowCallMenu(false)}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-red-50 dark:hover:bg-red-500/5 border-b last:border-0 border-zinc-100 dark:border-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: phone.color }}></div>
                        <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">{phone.label}</span>
                      </div>
                      <span className="text-[15px] font-black text-zinc-900 dark:text-white tabular-nums tracking-tighter">{phone.number}</span>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>

          <a
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 bg-[#1877F2] hover:bg-[#166fe5] text-white font-black py-4 rounded-2xl flex items-center justify-center transition-all active:scale-[0.96] shadow-xl border border-white/10"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
