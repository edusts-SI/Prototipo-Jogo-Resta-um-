
import React from 'react';
import { SectionWrapper } from './SectionWrapper';

export const AboutSection: React.FC = () => {
  return (
    <SectionWrapper title="Simples de Aprender, Difícil de Dominar">
      <div className="max-w-3xl mx-auto text-center text-lg text-gray-400 leading-relaxed">
        <p>
          O "Resta Um" é um tradicional e cativante jogo de tabuleiro para um único jogador, um quebra-cabeça que atravessou gerações. Conhecido por sua simplicidade de regras e pela surpreendente complexidade de sua solução, o jogo é um verdadeiro teste para o raciocínio lógico, concentração e visão estratégica.
        </p>
        <p className="mt-4">
          O objetivo é claro, mas desafiador: eliminar o maior número de peças do tabuleiro, de forma que, ao final da partida, reste apenas uma. A vitória ideal? Deixar essa última peça exatamente no centro, o ponto de partida vazio. Cada movimento conta nesta jornada solitária de lógica e perspicácia.
        </p>
      </div>
    </SectionWrapper>
  );
};
