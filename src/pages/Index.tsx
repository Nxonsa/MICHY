import React from 'react';
import DJDeck from '@/components/DJDeck';
import Mixer from '@/components/Mixer';

const Index = () => {
  return (
    <div className="min-h-screen bg-dj-dark p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-dj-text mb-12">
          <span className="text-dj-accent1">DJ</span>
          <span className="text-dj-accent2">Studio</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DJDeck side="left" />
          <DJDeck side="right" />
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Mixer />
        </div>
      </div>
    </div>
  );
};

export default Index;