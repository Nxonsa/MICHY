import React, { useState, useEffect, useRef } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Volume2, Play, Pause, RotateCcw, Disc } from "lucide-react";
import { toast } from "sonner";

interface DJDeckProps {
  side: 'left' | 'right';
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const DJDeck: React.FC<DJDeckProps> = ({ side }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [pitch, setPitch] = useState([0]);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isPlateSpinning, setIsPlateSpinning] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [eq, setEq] = useState({
    high: [50],
    mid: [50],
    low: [50],
  });

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube API Ready');
    };
  }, []);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleYoutubeLinkSubmit = () => {
    if (!youtubeLink) {
      toast.error("Please enter a YouTube link");
      return;
    }

    const videoId = extractVideoId(youtubeLink);
    if (!videoId) {
      toast.error("Invalid YouTube link");
      return;
    }

    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player(`youtube-player-${side}`, {
      height: '1',
      width: '1',
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
      },
      events: {
        onReady: () => {
          console.log('Player ready');
          toast.success("Track loaded successfully!");
          playerRef.current.setVolume(volume[0]);
        },
        onError: () => {
          toast.error("Error loading video");
        }
      }
    });
  };

  const togglePlayback = () => {
    if (!playerRef.current) {
      toast.error("Please load a track first");
      return;
    }

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }

    setIsPlaying(!isPlaying);
    setIsPlateSpinning(!isPlateSpinning);
  };

  const handlePlateClick = () => {
    togglePlayback();
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume[0]);
    }
  }, [volume]);

  useEffect(() => {
    if (playerRef.current) {
      const playbackRate = 1 + (pitch[0] / 100);
      playerRef.current.setPlaybackRate(playbackRate);
    }
  }, [pitch]);

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
              onClick={togglePlayback}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="w-12 h-12 rounded-full bg-dj-dark hover:bg-dj-accent2 transition-colors duration-300"
              onClick={() => {
                if (playerRef.current) {
                  playerRef.current.seekTo(0);
                }
              }}
            >
              <RotateCcw className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center items-center py-8">
          <div 
            className={`relative w-48 h-48 rounded-full bg-dj-dark flex items-center justify-center cursor-pointer hover:scale-105 transition-transform ${isPlateSpinning ? 'animate-[spin_2s_linear_infinite]' : ''}`}
            onClick={handlePlateClick}
          >
            <Disc className="w-32 h-32 text-dj-accent1" />
            <div className="absolute inset-0 rounded-full border-4 border-dj-accent2 opacity-20"></div>
          </div>
        </div>

        <div id={`youtube-player-${side}`} style={{ display: 'none' }}></div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Paste YouTube link..."
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className="flex-1 bg-dj-dark text-dj-text border-dj-accent1/20 focus:border-dj-accent1"
            />
            <Button 
              onClick={handleYoutubeLinkSubmit}
              className="bg-dj-accent1 hover:bg-dj-accent1/80"
            >
              Load
            </Button>
          </div>

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