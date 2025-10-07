
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800/50 border-t border-gray-700 mt-20">
      <div className="container mx-auto px-6 py-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Resta Um Online. Um clássico recriado para a web.</p>
      </div>
    </footer>
  );
};
