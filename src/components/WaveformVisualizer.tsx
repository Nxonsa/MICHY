import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  isPlaying: boolean;
  player: any;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ isPlaying, player }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawWaveform = () => {
      if (!ctx || !isPlaying) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = '#22c55e'; // Green color matching the theme

      // Create a simple animated waveform
      const time = Date.now() / 1000;
      const amplitude = 30;
      const frequency = 2;

      ctx.moveTo(0, canvas.height / 2);
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + 
                 Math.sin(x * 0.02 + time * frequency) * amplitude * 
                 Math.sin(time) * (isPlaying ? 1 : 0.1);
        ctx.lineTo(x, y);
      }

      ctx.stroke();
      animationFrameRef.current = requestAnimationFrame(drawWaveform);
    };

    if (isPlaying) {
      drawWaveform();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={80} 
      className="w-full h-20 bg-dj-dark/50 rounded-lg"
    />
  );
};

export default WaveformVisualizer;