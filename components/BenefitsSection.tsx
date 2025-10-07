
import React from 'react';
import { SectionWrapper } from './SectionWrapper';

const BenefitItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <li className="flex items-center space-x-3">
    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-lg text-gray-300">{text}</span>
  </li>
);

const BrainIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const FocusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const PuzzleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>;


export const BenefitsSection: React.FC = () => {
  return (
    <SectionWrapper title="Mais que um Jogo, um Treino para o Cérebro">
      <div className="max-w-md mx-auto bg-gray-800/50 p-8 rounded-xl border border-gray-700">
        <ul className="space-y-4">
          <BenefitItem icon={<BrainIcon />} text="Desenvolvimento do raciocínio lógico." />
          <BenefitItem icon={<FocusIcon />} text="Aprimoramento da concentração e da atenção." />
          <BenefitItem icon={<PuzzleIcon />} text="Estímulo à resolução de problemas e planejamento." />
        </ul>
      </div>
    </SectionWrapper>
  );
};
