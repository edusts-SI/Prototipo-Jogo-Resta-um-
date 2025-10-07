
import React, { useRef } from 'react';
import { Header } from './components/Header';
import { AboutSection } from './components/AboutSection';
import { RulesSection } from './components/RulesSection';
import { TutorialSection } from './components/TutorialSection';
import { BenefitsSection } from './components/BenefitsSection';
import { GameSection } from './components/GameSection';
import { ExtrasSection } from './components/ExtrasSection';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header onPlayClick={() => scrollTo(gameRef)} onRulesClick={() => scrollTo(rulesRef)} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AboutSection />
        <div ref={rulesRef}>
          <RulesSection />
        </div>
        <TutorialSection />
        <BenefitsSection />
        <div ref={gameRef}>
          <GameSection />
        </div>
        <ExtrasSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
