export const detectTempo = (player: any): number => {
  try {
    // YouTube doesn't provide direct BPM/tempo information
    // We're returning the playback rate as a baseline
    return player?.getPlaybackRate() || 1;
  } catch (error) {
    console.error('Error detecting tempo:', error);
    return 1;
  }
};