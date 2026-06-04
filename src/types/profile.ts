export interface SocialLink {
  label: string;
  url: string;
  iconClass: string;
}

export interface Profile {
  id: string;
  displayName: string;
  username: string;
  role: string;
  status: string;
  viewCount: string;
  discordUserId: string;
  socials: SocialLink[];
  fallbackAvatar: string;
}
