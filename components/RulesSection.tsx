
import React from 'react';
import { SectionWrapper } from './SectionWrapper';

const RuleCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-gray-800 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-700">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-500 text-white mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const JumpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const LandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-4 4-4-4" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16V4" />
  </svg>
);

const CaptureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);


export const RulesSection: React.FC = () => {
  return (
    <SectionWrapper title="As 3 Regras de Ouro do Resta Um">
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <RuleCard 
          icon={<JumpIcon />}
          title="O Salto" 
          description="Mova uma peça saltando sobre uma peça vizinha, sempre na horizontal ou vertical." 
        />
        <RuleCard 
          icon={<LandIcon />}
          title="O Pouso" 
          description="Sua peça deve aterrissar em um espaço vazio logo após a peça que você pulou." 
        />
        <RuleCard 
          icon={<CaptureIcon />}
          title="A Captura" 
          description="A peça que foi pulada é imediatamente removida do tabuleiro. Simples assim!" 
        />
      </div>
    </SectionWrapper>
  );
};
