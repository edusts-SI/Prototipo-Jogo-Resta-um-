
import React from 'react';

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, children, id }) => {
  return (
    <section id={id} className="py-16 sm:py-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
        {title}
      </h2>
      {children}
    </section>
  );
};
