import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

// Minimal client-side router (no extra deps)
function usePathname() {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return [path, (to) => { if (to !== window.location.pathname) { window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')); } }];
}

function HomePage() {
  return (
    <>
      <Hero />
      {/* Space for additional home sections like Services in the next iteration */}
    </>
  );
}

function CalculatorPage() {
  return (
    <>
      <Calculator />
    </>
  );
}

function ContactsPage() {
  // Simple frontend-only form with basic validation and success message
  const [form, setForm] = useState({ nome: '', email: '', tel: '', messaggio: '', consenso: false });
  const [sent, setSent] = useState(false);
  const valid = useMemo(() => form.nome && /.+@.+\..+/.test(form.email) && form.messaggio && form.consenso, [form]);

  return (
    <section className="relative py-24 bg-white dark:bg-neutral-950" aria-labelledby="contact-title">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="contact-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">Contattaci</h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300">Compila il form, ti risponderemo a breve.</p>

        {!sent ? (
          <form
            className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-black/5 dark:border-white/5 bg-[#F7F8FA] dark:bg-neutral-900 p-6"
            onSubmit={(e) => { e.preventDefault(); if (valid) setSent(true); }}
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Nome</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  required
                  className="mt-1 w-full rounded-2xl bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#1663FF]"
                  placeholder="Mario Rossi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="mt-1 w-full rounded-2xl bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#1663FF]"
                  placeholder="nome@azienda.it"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Telefono / WhatsApp</label>
              <input
                type="tel"
                value={form.tel}
                onChange={(e) => setForm({ ...form, tel: e.target.value })}
                className="mt-1 w-full rounded-2xl bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#1663FF]"
                placeholder="+39 3xx xxx xxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Messaggio</label>
              <textarea
                rows={5}
                value={form.messaggio}
                onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
                required
                className="mt-1 w-full rounded-2xl bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#1663FF]"
                placeholder="Raccontaci del tuo progetto"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <input
                  type="checkbox"
                  checked={form.consenso}
                  onChange={(e) => setForm({ ...form, consenso: e.target.checked })}
                  className="h-4 w-4 rounded border-black/20 dark:border-white/20"
                  required
                />
                Accetto l'informativa privacy
              </label>
              <button
                type="submit"
                disabled={!valid}
                className={`rounded-full px-5 py-2.5 text-sm font-medium text-white transition ${valid ? 'bg-[#1663FF] hover:brightness-110' : 'bg-neutral-400 dark:bg-neutral-700 cursor-not-allowed'}`}
              >
                Invia
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 rounded-2xl border border-[#1663FF]/20 bg-[#1663FF]/10 p-6 text-[#1663FF]">
            Grazie! Il tuo messaggio è stato inviato (demo). Ti risponderemo al più presto.
          </div>
        )}

        <div className="mt-10 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
          <iframe
            title="Mappa"
            className="w-full h-72"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=12.48%2C41.89%2C12.50%2C41.90&layer=mapnik"
          />
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [path, navigate] = usePathname();

  useEffect(() => {
    // Basic SEO tags per-route (frontend only)
    const titles = {
      '/': 'SiteNova — Esperienze web premium',
      '/calcolatore': 'Calcolatore Preventivo — SiteNova',
      '/contatti': 'Contatti — SiteNova',
      '/servizi': 'Servizi — SiteNova',
    };
    document.title = titles[path] || 'SiteNova';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Siti web minimal e futuristici con prestazioni elevate.');
  }, [path]);

  return (
    <div className="font-inter bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white min-h-screen">
      <Header path={path} onNavigate={navigate} />
      <main>
        {path === '/' && <HomePage />}
        {path === '/calcolatore' && <CalculatorPage />}
        {path === '/contatti' && <ContactsPage />}
        {path === '/servizi' && (
          <section className="py-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Servizi</h2>
              <p className="mt-3 text-neutral-600 dark:text-neutral-300">Panoramica dei servizi. Seleziona dal menu per i dettagli nelle prossime iterazioni.</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
