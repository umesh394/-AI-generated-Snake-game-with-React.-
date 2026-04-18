import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { DUMMY_TRACKS } from '../constants';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Playback failed:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative overflow-hidden bg-black p-6 pixel-border">
      <audio
        ref={audioRef}
        src={currentTrack.url}
      />

      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex gap-4 items-start">
          <div className="relative w-32 h-32 flex-shrink-0 bg-cyan-900 border-2 border-magenta-500 overflow-hidden">
            <motion.img
              key={currentTrack.coverUrl}
              src={currentTrack.coverUrl}
              alt="STREAM_ID"
              className="w-full h-full object-cover grayscale opacity-50 contrast-150"
              referrerPolicy="no-referrer"
            />
            {isPlaying && (
               <div className="absolute inset-0 bg-magenta-500/20 mix-blend-screen animate-pulse" />
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="text-[10px] font-mono text-magenta-500 uppercase tracking-tighter">DATA_STREAM: 0x{currentTrack.id}</div>
            <h3 className="text-lg font-pixel text-white glitch-text truncate">{currentTrack.title}</h3>
            <p className="text-sm font-mono text-cyan-400">AUTHOR: {currentTrack.artist}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
             <div className="flex justify-between text-[8px] font-mono text-cyan-800 uppercase">
              <span>BIT_POS: {formatTime(currentTime)}</span>
              <span>TOTAL_LEN: {formatTime(currentTrack.duration)}</span>
            </div>
            <div className="h-4 w-full bg-slate-900 border border-cyan-400 relative overflow-hidden">
              <motion.div
                className="h-full bg-magenta-500 shadow-[0_0_10px_#ff00ff]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-[8px] font-pixel text-black mix-blend-difference">
                PROGRESS_BAR
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevTrack}
              className="pixel-button p-2 text-xs w-10 h-10 flex items-center justify-center"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              className="pixel-button px-6 py-2 text-sm h-12 flex items-center justify-center font-pixel"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={nextTrack}
              className="pixel-button p-2 text-xs w-10 h-10 flex items-center justify-center"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-cyan-900 grid grid-cols-1 gap-1">
          {DUMMY_TRACKS.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(idx);
                setIsPlaying(true);
              }}
              className={`flex items-center gap-3 p-2 text-[10px] font-mono transition-all ${
                idx === currentTrackIndex 
                  ? 'bg-magenta-500 text-white' 
                  : 'text-cyan-600 hover:bg-cyan-900/30'
              }`}
            >
              <span>{idx + 1}.</span>
              <span className="flex-1 text-left truncate">{track.title}</span>
              <span className="opacity-50">[{formatTime(track.duration)}]</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
