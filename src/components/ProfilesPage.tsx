import AudioPlayer from './AudioPlayer';
import ProfileCard from './ProfileCard';
import { useDiscordAvatars } from '../hooks/useDiscordAvatars';
import type { Profile } from '../types/profile';

interface ProfilesPageProps {
  profiles: Profile[];
}

export default function ProfilesPage({ profiles }: ProfilesPageProps) {
  const avatarMap = useDiscordAvatars(
    profiles.reduce<Record<string, string>>((acc, profile) => {
      acc[profile.id] = profile.discordUserId;
      return acc;
    }, {})
  );

  return (
    <main>
      <header>
        <nav>
          <div className="header_logo" />
          <div className="header_links">
            <ul className="nav_links" />
          </div>
        </nav>
      </header>

      <section className="main">
        <div className="profile-container">
          {profiles.map((profile) => (
            <div key={profile.id} className="profile">
              <ProfileCard profile={profile} avatarUrl={avatarMap[profile.id]} />
            </div>
          ))}
        </div>
      </section>

      <AudioPlayer />
    </main>
  );
}
