import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Volume2, Disc } from "lucide-react";
import { toast } from "sonner";
import WaveformVisualizer from './WaveformVisualizer';
import PlayerControls from './PlayerControls';
import YouTubeControls from './YouTubeControls';
import { useYouTubePlayer } from '@/hooks/useYouTubePlayer';

interface DJDeckProps {
  side: 'left' | 'right';
}

const DJDeck: React.FC<DJDeckProps> = ({ side }) => {
  const [volume, setVolume] = useState([75]);
  const [pitch, setPitch] = useState([0]);
  const [isPlateSpinning, setIsPlateSpinning] = useState(false);
  const [eq, setEq] = useState({
    high: [50],
    mid: [50],
    low: [50],
  });

  const {
    playerRef,
    isPlayerReady,
    isPlaying,
    setIsPlaying,
    tempo,
    createPlayer,
  } = useYouTubePlayer(side, volume);

  const togglePlayback = () => {
    if (!playerRef.current) {
      toast.error("Please load a track first");
      return;
    }

    if (!isPlayerReady) {
      toast.error("Player is not ready yet. Please wait a moment.");
      return;
    }

    console.log(`Attempting to ${isPlaying ? 'pause' : 'play'} video on deck ${side}`);
    
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.unMute();
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
      setIsPlateSpinning(!isPlateSpinning);
    } catch (error) {
      console.error(`Playback error on deck ${side}:`, error);
      toast.error("Error controlling playback");
    }
  };

  const handlePlateClick = () => {
    togglePlayback();
  };

  const handleReset = () => {
    if (playerRef.current && isPlayerReady) {
      playerRef.current.seekTo(0);
    }
  };

  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      playerRef.current.setVolume(volume[0]);
      playerRef.current.unMute();
    }
  }, [volume, isPlayerReady]);

  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      const playbackRate = 1 + (pitch[0] / 100);
      playerRef.current.setPlaybackRate(playbackRate);
    }
  }, [pitch, isPlayerReady]);

  return (
    <div className="bg-dj-light p-6 rounded-xl backdrop-blur-lg border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-dj-text text-xl font-bold">Deck {side === 'left' ? 'A' : 'B'}</h2>
          <PlayerControls 
            isPlaying={isPlaying}
            onPlayPause={togglePlayback}
            onReset={handleReset}
            tempo={tempo}
          />
        </div>

        <div className="relative flex flex-col items-center gap-4">
          <div 
            className={`relative w-48 h-48 rounded-full bg-dj-dark flex items-center justify-center cursor-pointer hover:scale-105 transition-transform ${isPlateSpinning ? 'animate-[spin_2s_linear_infinite]' : ''}`}
            onClick={handlePlateClick}
          >
            <Disc className="w-32 h-32 text-dj-accent1" />
            <div className="absolute inset-0 rounded-full border-4 border-dj-accent2 opacity-20"></div>
          </div>
          <WaveformVisualizer isPlaying={isPlaying} player={playerRef.current} />
        </div>

        <YouTubeControls onLoadVideo={createPlayer} />

        <div className="space-y-4">
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