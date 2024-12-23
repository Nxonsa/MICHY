import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const Mixer = () => {
  const [crossfader, setCrossfader] = useState([50]);
  const [effects, setEffects] = useState({
    echo: false,
    filter: false,
    flanger: false
  });

  return (
    <div className="bg-dj-light p-6 rounded-xl backdrop-blur-lg border border-white/10 shadow-xl">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(effects).map(([effect, active]) => (
            <button
              key={effect}
              onClick={() => setEffects(prev => ({ ...prev, [effect]: !prev[effect] }))}
              className={cn(
                "px-4 py-2 rounded-lg text-dj-text uppercase text-sm font-bold transition-all duration-300",
                active ? "bg-dj-accent1" : "bg-dj-dark hover:bg-dj-accent2/20"
              )}
            >
              {effect}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-dj-text text-center block">CROSSFADER</label>
          <Slider
            defaultValue={crossfader}
            max={100}
            step={1}
            className="w-full"
            onValueChange={setCrossfader}
          />
        </div>
      </div>
    </div>
  );
};

export default Mixer;