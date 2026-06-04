import { useEffect, useRef, useState } from 'react';
import LandingPage from './components/LandingPage';
import ProfilesPage from './components/ProfilesPage';
import avatar1 from '../assets/background/avatar1.jpg';
import avatar2 from '../assets/background/avatar2.jpg';
import type { Profile } from './types/profile';

const autoTitle = ['friends'];

const initialProfiles: Profile[] = [
  {
    id: 'mis',
    displayName: 'mis',
    username: '@wontt',
    role: 'Parceira',
    status: '',
    viewCount: '♡',
    discordUserId: '1432223370044248104',
    socials: [
      { label: 'Discord', url: 'https://discord.com/users/1432223370044248104', iconClass: 'fab fa-discord' },
      { label: 'Instagram', url: 'https://www.instagram.com/weawayss/', iconClass: 'fab fa-instagram' },
    ],
    fallbackAvatar: avatar1,
  },
  {
    id: 'after',
    displayName: 'after',
    username: '@zxvzxvzvzvxvxz',
    role: 'Amor',
    status: '',
    viewCount: '♡',
    discordUserId: '1475918932434092065',
    socials: [
      { label: 'Discord', url: 'https://discord.com/users/1475918932434092065', iconClass: 'fab fa-discord' },
      { label: 'Instagram', url: 'https://www.instagram.com/ihavebadfeeling/', iconClass: 'fab fa-instagram' },
    ],
    fallbackAvatar: avatar2,
  },
];

function App() {
  const [showLanding, setShowLanding] = useState(() => window.location.hash !== '#home');
  const [pageTitle, setPageTitle] = useState(autoTitle[0]);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const isPointerRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (frameRef.current !== null) return;

      const x = event.clientX;
      const y = event.clientY;
      const target = event.target as HTMLElement | null;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const cursor = cursorRef.current;
        if (cursor) {
          cursor.style.left = `${x}px`;
          cursor.style.top = `${y}px`;
        }

        const interactive = target?.closest('a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])') != null;
        if (interactive !== isPointerRef.current) {
          isPointerRef.current = interactive;
          if (cursor) {
            cursor.classList.toggle('pointer', interactive);
          }
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPageTitle((currentTitle) => autoTitle[(autoTitle.indexOf(currentTitle) + 1) % autoTitle.length]);
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div className="app-shell">
      {showLanding ? (
        <LandingPage
          onContinue={() => {
            setShowLanding(false);
            window.location.hash = '#home';
          }}
        />
      ) : (
        <ProfilesPage profiles={initialProfiles} />
      )}
      <div id="custom-cursor" ref={cursorRef} className="custom-cursor" />
    </div>
  );
}

export default App;
