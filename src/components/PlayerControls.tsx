import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  tempo: number;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onReset,
  tempo,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-dj-text space-x-2">
        <span className="font-bold">Tempo:</span>
        <span>{(tempo * 100).toFixed(0)} BPM</span>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="w-12 h-12 rounded-full bg-dj-dark hover:bg-dj-accent1 transition-colors duration-300"
          onClick={onPlayPause}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="w-12 h-12 rounded-full bg-dj-dark hover:bg-dj-accent2 transition-colors duration-300"
          onClick={onReset}
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default PlayerControls;