import { Rocket, ShoppingCart, Search, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const cards = [
  {
    icon: Rocket,
    title: 'Sito vetrina',
    desc: 'Design su misura, performance elevate e gestione semplice.',
  },
  {
    icon: ShoppingCart,
    title: 'eCommerce',
    desc: 'Store moderni e sicuri, integrazione pagamenti e automazioni.',
  },
  {
    icon: Search,
    title: 'SEO',
    desc: 'Posizionamento organico, audit tecnico e content strategy.',
  },
  {
    icon: Shield,
    title: 'Manutenzione',
    desc: 'Aggiornamenti, monitoraggio e sicurezza 24/7.',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-white to-[#F7F8FA] dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">Servizi</h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">Soluzioni complete per far crescere il tuo brand.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 hover:-translate-y-1 transition shadow-sm hover:shadow-md"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1663FF]/10 text-[#1663FF] flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{c.desc}</p>
              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[#1663FF]/40 to-transparent" />
              <button className="mt-4 text-[#1663FF] text-sm font-medium opacity-0 group-hover:opacity-100 transition">Scopri di più →</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
