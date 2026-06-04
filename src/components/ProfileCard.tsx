import type { Profile } from '../types/profile';

interface ProfileCardProps {
  profile: Profile;
  avatarUrl?: string;
}

export default function ProfileCard({ profile, avatarUrl }: ProfileCardProps) {
  const oppositeName = profile.id === 'mis' ? 'after' : profile.id === 'after' ? 'mis' : profile.displayName;

  return (
    <article className="profile-card">
      <div className="card-top">
        <div className="profile-header">
          <div className="profile-box">
            <img src={avatarUrl ?? profile.fallbackAvatar} alt={`${profile.displayName} avatar`} />
          </div>
          <div className="profile-info">
            <div className="profile-title">
              <h2>{profile.displayName}</h2>
              <span className="view-count">{profile.viewCount}</span>
            </div>
            <span className="profile-username">{profile.username}</span>
            {profile.status && <p className="profile-status">{profile.status}</p>}
          </div>
        </div>
        <div className="profile-socials">
          {profile.socials.map((social) => (
            <a key={social.label} target="_blank" rel="noreferrer" href={social.url} aria-label={social.label}>
              <i className={social.iconClass} />
            </a>
          ))}
        </div>
        <div className="love-badge">EU TE AMO {oppositeName.toUpperCase()}</div>
      </div>
      <div className="card-bottom" />
    </article>
  );
}
