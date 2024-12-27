import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface YouTubeControlsProps {
  onLoadVideo: (videoId: string) => void;
}

const YouTubeControls: React.FC<YouTubeControlsProps> = ({ onLoadVideo }) => {
  const [youtubeLink, setYoutubeLink] = useState('');

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

    onLoadVideo(videoId);
  };

  return (
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
  );
};

export default YouTubeControls;