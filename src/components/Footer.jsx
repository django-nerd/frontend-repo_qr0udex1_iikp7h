import { MessageCircle, Instagram, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative border-t border-black/5 dark:border-white/5 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-semibold">
              <div className="w-6 h-6 rounded-md bg-[#1663FF]"></div>
              SiteNova
            </div>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">Soluzioni web eleganti e ad alte prestazioni.</p>
          </div>
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white mb-3">Link rapidi</div>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
              <li><a href="/servizi" className="hover:text-[#1663FF]">Servizi</a></li>
              <li><a href="/portfolio" className="hover:text-[#1663FF]">Portfolio</a></li>
              <li><a href="/calcolatore" className="hover:text-[#1663FF]">Preventivo</a></li>
              <li><a href="/contatti" className="hover:text-[#1663FF]">Contatti</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white mb-3">Contatti</div>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@sitenova.io</li>
              <li className="flex items-center gap-2"><Instagram className="w-4 h-4" /> @sitenova</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white mb-3">Resta in contatto</div>
            <a href="https://wa.me/393000000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1663FF] text-white px-5 py-2.5 hover:brightness-110 transition">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span>© {new Date().getFullYear()} SiteNova. Tutti i diritti riservati.</span>
          <div className="flex items-center gap-3">
            <a href="/legal" className="hover:text-[#1663FF]">Privacy</a>
            <a href="/legal" className="hover:text-[#1663FF]">Cookie</a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp FAB */}
      <motion.a
        href="https://wa.me/393000000000"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 ring-8 ring-[#25D366]/10"
        aria-label="Apri WhatsApp"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1, 1.06, 1],
        }}
        transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 12 }}
        whileHover={{ boxShadow: '0 0 0 0 rgba(37,211,102,0.3)', scale: 1.05 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>
    </footer>
  );
}
