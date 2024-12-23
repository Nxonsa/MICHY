import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Volume2, Play, Pause, RotateCcw, FastForward } from "lucide-react";

interface DJDeckProps {
  side: 'left' | 'right';
}

const DJDeck: React.FC<DJDeckProps> = ({ side }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [pitch, setPitch] = useState([0]);
  const [eq, setEq] = useState({
    high: [50],
    mid: [50],
    low: [50],
  });

  return (
    <div className="bg-dj-light p-6 rounded-xl backdrop-blur-lg border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-dj-text text-xl font-bold">Deck {side === 'left' ? 'A' : 'B'}</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="w-12 h-12 rounded-full bg-dj-dark hover:bg-dj-accent1 transition-colors duration-300"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="w-12 h-12 rounded-full bg-dj-dark hover:bg-dj-accent2 transition-colors duration-300"
            >
              <RotateCcw className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Volume2 className="h-5 w-5 text-dj-text" />
            <Slider
              defaultValue={volume}
              max={100}
              step={1}
              className="w-full"
              onValueChange={setVolume}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-dj-text">HIGH</label>
              <Slider
                defaultValue={eq.high}
                max={100}
                step={1}
                orientation="vertical"
                className="h-32"
                onValueChange={(value) => setEq({ ...eq, high: value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-dj-text">MID</label>
              <Slider
                defaultValue={eq.mid}
                max={100}
                step={1}
                orientation="vertical"
                className="h-32"
                onValueChange={(value) => setEq({ ...eq, mid: value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-dj-text">LOW</label>
              <Slider
                defaultValue={eq.low}
                max={100}
                step={1}
                orientation="vertical"
                className="h-32"
                onValueChange={(value) => setEq({ ...eq, low: value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-dj-text">PITCH</label>
            <Slider
              defaultValue={pitch}
              min={-8}
              max={8}
              step={0.1}
              className="w-full"
              onValueChange={setPitch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DJDeck;