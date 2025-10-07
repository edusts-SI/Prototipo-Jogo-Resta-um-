
import React from 'react';
import { SectionWrapper } from './SectionWrapper';

const TutorialStep: React.FC<{ number: number; title: string; description: string; }> = ({ number, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 text-teal-400 font-bold text-xl border-2 border-gray-600">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-400 mt-1">{description}</p>
    </div>
  </div>
);

export const TutorialSection: React.FC = () => {
  return (
    <SectionWrapper title="Seu Guia para a Primeira Partida">
      <div className="max-w-2xl mx-auto space-y-8">
        <TutorialStep 
          number={1}
          title="Prepare o Campo"
          description="Posicione suas 32 peças no tabuleiro, deixando o centro livre para começar a mágica."
        />
        <TutorialStep 
          number={2}
          title="Planeje e Salte"
          description="Escolha seu movimento. Lembre-se, cada salto elimina uma peça e abre novas possibilidades."
        />
        <TutorialStep 
          number={3}
          title="Limpe o Tabuleiro"
          description="Continue saltando e capturando. O segredo é não deixar peças isoladas que não possam ser alcançadas."
        />
        <TutorialStep 
          number={4}
          title="Alcance a Glória"
          description="Seu objetivo: terminar com UMA única peça, de preferência no centro. Parabéns, você venceu!"
        />
      </div>
    </SectionWrapper>
  );
};
