import React from 'react';
import DJDeck from '@/components/DJDeck';
import Mixer from '@/components/Mixer';

const Index = () => {
  return (
    <div className="min-h-screen bg-dj-dark p-8 flex flex-col">
      <div className="max-w-7xl mx-auto space-y-8 flex-grow">
        <h1 className="text-4xl font-bold text-center text-dj-text mb-12">
          <span className="text-dj-accent1">Michy</span>
          <span className="text-dj-accent2">DJ</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DJDeck side="left" />
          <DJDeck side="right" />
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Mixer />
        </div>
      </div>
      
      <footer className="mt-12 text-center">
        <a 
          href="https://mediaowl.co.za" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-dj-light rounded-lg text-dj-text hover:bg-dj-accent1 transition-colors duration-300"
        >
          Created by Media Owl
        </a>
      </footer>
    </div>
  );
};

export default Index;