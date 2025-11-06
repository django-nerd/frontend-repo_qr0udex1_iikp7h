import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    key: 'type',
    label: 'Tipo di progetto',
    options: [
      { value: 'vetrina', label: 'Sito vetrina', price: 1200 },
      { value: 'ecommerce', label: 'eCommerce', price: 2500 },
      { value: 'landing', label: 'Landing page', price: 800 },
    ],
  },
  {
    key: 'design',
    label: 'Design & brand',
    options: [
      { value: 'basic', label: 'Temi e componenti', price: 0 },
      { value: 'custom', label: 'Design su misura', price: 600 },
      { value: 'premium', label: 'Design premium (UI kit + motion)', price: 1200 },
    ],
  },
  {
    key: 'features',
    label: 'Funzionalità',
    options: [
      { value: 'blog', label: 'Blog / CMS', price: 300 },
      { value: 'seo', label: 'SEO avanzata', price: 400 },
      { value: 'analytics', label: 'Analytics & heatmaps', price: 250 },
      { value: 'automation', label: 'Automazioni / integrazioni', price: 500 },
    ],
    multiple: true,
  },
  {
    key: 'care',
    label: 'Manutenzione',
    options: [
      { value: 'none', label: 'Nessuna', price: 0 },
      { value: 'standard', label: 'Standard', price: 60, per: 'mese' },
      { value: 'pro', label: 'Pro', price: 120, per: 'mese' },
    ],
  },
];

export default function Calculator() {
  const [active, setActive] = useState(0);
  const [values, setValues] = useState({ type: null, design: null, features: [], care: 'none' });

  const base = useMemo(() => {
    const t = steps[0].options.find(o => o.value === values.type)?.price || 0;
    const d = steps[1].options.find(o => o.value === values.design)?.price || 0;
    const f = values.features.reduce((acc, v) => acc + (steps[2].options.find(o => o.value === v)?.price || 0), 0);
    const m = steps[3].options.find(o => o.value === values.care)?.price || 0;
    return { oneOff: t + d + f, monthly: m };
  }, [values]);

  const setOption = (key, value) => {
    setValues(prev => {
      if (key === 'features') {
        const exists = prev.features.includes(value);
        return { ...prev, features: exists ? prev.features.filter(v => v !== value) : [...prev.features, value] };
      }
      return { ...prev, [key]: value };
    });
  };

  const next = () => setActive((i) => Math.min(i + 1, steps.length - 1));
  const prev = () => setActive((i) => Math.max(i - 1, 0));

  return (
    <section id="calculator" className="relative py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">Calcolatore preventivo</h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">Stima in tempo reale in pochi passaggi.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-neutral-500 dark:text-neutral-400">Stima una tantum</div>
            <div className="text-2xl font-semibold text-neutral-900 dark:text-white">€ {base.oneOff.toLocaleString('it-IT')}</div>
            <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">+ € {base.monthly}/mese</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-black/5 dark:border-white/5 bg-[#F7F8FA] dark:bg-neutral-900 p-6">
            <div className="flex items-center gap-3 flex-wrap mb-6">
              {steps.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setActive(i)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${i === active ? 'bg-[#1663FF] text-white' : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'}`}
                >
                  {i + 1}. {s.label}
                </button>
              ))}
            </div>

            <motion.div
              key={steps[active].key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {steps[active].options.map((o) => {
                const selected = steps[active].multiple ? values.features.includes(o.value) : values[steps[active].key] === o.value;
                return (
                  <button
                    key={o.value}
                    onClick={() => setOption(steps[active].key, o.value)}
                    className={`text-left rounded-xl border p-4 transition hover:border-[#1663FF] ${selected ? 'border-[#1663FF] bg-[#1663FF]/5' : 'border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800'}`}
                  >
                    <div className="font-medium text-neutral-900 dark:text-white">{o.label}</div>
                    <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{o.per ? `€ ${o.price}/${o.per}` : `€ ${o.price}`}</div>
                  </button>
                );
              })}
            </motion.div>

            <div className="mt-6 flex justify-between">
              <button onClick={prev} className="rounded-full px-4 py-2 text-sm bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300">Indietro</button>
              <button onClick={next} className="rounded-full px-4 py-2 text-sm bg-[#1663FF] text-white">Avanti</button>
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-neutral-900 p-6">
            <h3 className="font-semibold text-neutral-900 dark:text-white">Riepilogo</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              {Object.entries(values).map(([k, v]) => (
                <li key={k} className="flex justify-between gap-4">
                  <span className="capitalize">{k}</span>
                  <span>{Array.isArray(v) ? v.join(', ') || '-' : v || '-'}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-[#1663FF]/10 text-[#1663FF]">
              Preventivo stimato: <span className="font-semibold text-neutral-900 dark:text-white">€ {base.oneOff.toLocaleString('it-IT')}</span> + <span className="font-semibold text-neutral-900 dark:text-white">€ {base.monthly}/mese</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
