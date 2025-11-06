import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] pt-24 overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/FduaNp3csZktbOi3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-neutral-950/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[70vh]">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
            >
              Esperienze web premium, minimal e futuristiche
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="mt-6 text-lg text-neutral-300 max-w-xl"
            >
              SiteNova costruisce siti eleganti e performanti che ispirano fiducia e tecnologia moderna.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#calculator" className="inline-flex items-center justify-center rounded-full bg-[#1663FF] hover:brightness-110 text-white px-6 py-3 font-medium transition">Calcola il tuo preventivo</a>
              <a href="https://wa.me/393000000000" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-medium hover:bg-white/10 transition">Parla su WhatsApp</a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
