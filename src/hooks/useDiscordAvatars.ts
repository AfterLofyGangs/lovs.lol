import { useEffect, useState } from 'react';

export function useDiscordAvatars(discordIds: Record<string, string>) {
  const [avatars, setAvatars] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchAvatars = async () => {
      const nextAvatars: Record<string, string> = {};

      await Promise.all(
        Object.entries(discordIds).map(async ([profileId, userId]) => {
          try {
            const response = await fetch(`https://japi.rest/discord/v1/user/${userId}`);
            if (!response.ok) {
              return;
            }
            const json = await response.json();
            const avatar = json.data?.avatar;
            if (avatar) {
              const isAnimated = avatar.startsWith('a_');
              const format = isAnimated ? 'gif' : 'png';
              nextAvatars[profileId] = `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${format}?size=256`;
            }
          } catch (error) {
            console.warn('Falha ao atualizar avatar:', error);
          }
        })
      );

      if (Object.keys(nextAvatars).length > 0) {
        setAvatars((current) => ({ ...current, ...nextAvatars }));
      }
    };

    fetchAvatars();
    const interval = window.setInterval(fetchAvatars, 30000);
    return () => window.clearInterval(interval);
  }, [discordIds]);

  return avatars;
}
