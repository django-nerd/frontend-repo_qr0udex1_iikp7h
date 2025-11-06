import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-inter bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Calculator />
        {/* Portfolio, Chi siamo, Contatti e Dashboard mockup possono essere aggiunti nelle iterazioni successive */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
