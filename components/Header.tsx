
import React from 'react';

interface HeaderProps {
  onPlayClick: () => void;
  onRulesClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPlayClick, onRulesClick }) => {
  return (
    <header className="relative text-center py-24 md:py-32 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500 mb-4 tracking-tight">
          Resta Um
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          Um tabuleiro, 32 peças e um único objetivo: restar apenas um. Você aceita o desafio?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={onPlayClick}
            className="w-full sm:w-auto px-8 py-3 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Jogue Agora
          </button>
          <button
            onClick={onRulesClick}
            className="w-full sm:w-auto px-8 py-3 bg-gray-700 text-white font-bold rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Aprenda as Regras
          </button>
        </div>
      </div>
    </header>
  );
};
