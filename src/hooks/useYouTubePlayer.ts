import { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";
import { detectTempo } from '@/utils/audioAnalysis';

export const useYouTubePlayer = (side: 'left' | 'right', volume: number[]) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(1);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API Ready');
      };
    }
  }, []);

  const createPlayer = (videoId: string) => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    // Remove existing player div if it exists
    const existingDiv = document.getElementById(`youtube-player-${side}`);
    if (existingDiv) {
      existingDiv.remove();
    }

    // Create new player div
    const playerDiv = document.createElement('div');
    playerDiv.id = `youtube-player-${side}`;
    document.body.appendChild(playerDiv);

    console.log(`Creating new YouTube player for deck ${side} with video ID: ${videoId}`);

    playerRef.current = new window.YT.Player(`youtube-player-${side}`, {
      height: '1',
      width: '1',
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        origin: window.location.origin,
        enablejsapi: 1,
      },
      events: {
        onReady: (event: any) => {
          console.log(`Player ready for deck ${side}`);
          setIsPlayerReady(true);
          event.target.setVolume(volume[0]);
          event.target.unMute();
          setTempo(detectTempo(event.target));
          toast.success("Track loaded successfully!");
        },
        onError: (error: any) => {
          console.error(`Player error for deck ${side}:`, error);
          toast.error("Error loading video");
          setIsPlayerReady(false);
        },
        onStateChange: (event: any) => {
          console.log(`Player state changed for deck ${side}:`, event.data);
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          }
          setTempo(detectTempo(event.target));
        }
      }
    });
  };

  return {
    playerRef,
    isPlayerReady,
    isPlaying,
    setIsPlaying,
    tempo,
    createPlayer,
  };
};