import { useEffect, useMemo, useState } from 'react';
import { Moon, Sun, MessageCircle } from 'lucide-react';

function applyTheme(isDark) {
  const root = document.documentElement;
  if (isDark) root.classList.add('dark');
  else root.classList.remove('dark');
}

export default function Header({ path = '/', onNavigate }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    applyTheme(dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const NavLink = ({ to, children }) => {
    const active = useMemo(() => path === to, [path, to]);
    const base = 'px-3 py-2 rounded-full transition text-sm';
    const cls = active
      ? 'bg-black/5 dark:bg-white/10 text-neutral-900 dark:text-white'
      : 'text-neutral-700 dark:text-neutral-300 hover:text-[#1663FF]';
    return (
      <a
        href={to}
        onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(to); }}
        className={`${base} ${cls}`}
        aria-current={active ? 'page' : undefined}
      >
        {children}
      </a>
    );
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/60 dark:bg-neutral-900/60 border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/'); }}
          className="flex items-center gap-2 font-semibold tracking-tight text-neutral-900 dark:text-white"
        >
          <div className="w-6 h-6 rounded-xl bg-[#1663FF]"></div>
          <span>SiteNova</span>
        </a>
        <nav className="hidden md:flex items-center gap-2 text-sm">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/servizi">Servizi</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/calcolatore">Preventivo</NavLink>
          <NavLink to="/chi-siamo">Chi siamo</NavLink>
          <NavLink to="/contatti">Contatti</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/legal">Legal</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/393000000000"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-[#1663FF] text-white hover:brightness-110 transition"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <button
            aria-label="Toggle theme"
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-black/10 dark:hover:bg-white/20 transition"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
