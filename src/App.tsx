import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import MainSection from './components/MainSection';
import MusicPlayer from './components/MusicPlayer';

const App: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const titles = ["friends"];
    const titleInterval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
      document.title = titles[titleIndex];
    }, 1000);

    // Bloquear developer tools e context menu
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
        (e.ctrlKey && e.keyCode === 85) ||
        (e.key.startsWith('F') && !isNaN(parseInt(e.key.slice(1))))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Detectar DevTools aberto
    const devtoolsDetector = setInterval(() => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      if (
        (heightThreshold && widthThreshold) ||
        (window as any).Firebug?.chrome?.isInitialized
      ) {
        window.close();
      }
    }, 500);

    return () => {
      clearInterval(titleInterval);
      clearInterval(devtoolsDetector);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [titleIndex]);

  useEffect(() => {
    const handleSelectStart = (e: Event) => e.preventDefault();
    document.addEventListener('selectstart', handleSelectStart);
    return () => document.removeEventListener('selectstart', handleSelectStart);
  }, []);

  return (
    <div className="app">
      <Header />
      <MainSection />
      <MusicPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
    </div>
  );
};

export default App;
