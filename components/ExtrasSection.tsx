
import React from 'react';
import { SectionWrapper } from './SectionWrapper';

const TipCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
    <h4 className="font-bold text-lg text-teal-400 mb-2">{title}</h4>
    <p className="text-gray-400">{children}</p>
  </div>
);

export const ExtrasSection: React.FC = () => {
  return (
    <SectionWrapper title="Dicas e Curiosidades">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center md:text-left text-white mb-4">Dicas de Estratégia</h3>
          <TipCard title="Evite as Bordas">
            Tente não mover peças para as bordas do tabuleiro muito cedo, pois elas têm menos opções de movimento e podem ficar presas.
          </TipCard>
          <TipCard title="Limpe de Dentro para Fora">
            Concentre-se em limpar as peças centrais primeiro. Isso cria mais espaço para manobras e evita que o centro fique congestionado.
          </TipCard>
          <TipCard title="Pense em Grupos">
             Ao invés de mover peças aleatoriamente, tente usar uma peça "coletora" para pular sobre várias outras em sequência, limpando uma área do tabuleiro.
          </TipCard>
        </div>
        <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 flex flex-col justify-center">
           <h3 className="text-2xl font-bold text-center text-white mb-4">Você Sabia?</h3>
           <p className="text-gray-400 text-center leading-relaxed">
            A origem do Resta Um é um tanto misteriosa, mas acredita-se que o jogo tenha sido inventado na corte do Rei Luís XIV da França no século XVII. Outra teoria aponta para uma criação de um nobre francês aprisionado na Bastilha, que teria criado o jogo para passar o tempo. Seja qual for sua origem, ele se espalhou pela Europa e pelo mundo, tornando-se um clássico atemporal.
           </p>
        </div>
      </div>
    </SectionWrapper>
  );
};
