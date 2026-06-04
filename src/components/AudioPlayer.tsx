import { useEffect, useRef, useState } from 'react';
import backgroundMusic from '../../assets/musica.mp3';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const savedTime = Number(sessionStorage.getItem('musicTime') || '0');
    const savedPlaying = sessionStorage.getItem('musicPlaying') === 'true';

    if (audioRef.current) {
      audioRef.current.currentTime = savedTime;
      if (savedPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!audioRef.current) return;
      sessionStorage.setItem('musicTime', String(audioRef.current.currentTime));
      sessionStorage.setItem('musicPlaying', String(!audioRef.current.paused));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop src={backgroundMusic} />
      <button id="pauseMusicBtn" type="button" onClick={togglePlayback}>
        <i className={isPlaying ? 'fas fa-pause' : 'fas fa-play'} />
      </button>
    </>
  );
}
