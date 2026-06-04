import express from 'express';
import path from 'path';

const app = express();
const port = Number(process.env.PORT || 4000);
const distPath = path.resolve(__dirname, '../dist');

app.use(express.json());
app.use(express.static(distPath));

const profiles = [
  {
    id: 'mis',
    displayName: 'mis',
    status: '',
    role: 'Parceira',
    viewCount: '♡',
    socials: [
      { label: 'Discord', url: 'https://discord.com/users/1243905679824130092' },
      { label: 'Instagram', url: 'https://www.instagram.com/weawayss/' },
    ],
    discordUserId: '1243905679824130092',
  },
  {
    id: 'after',
    displayName: 'after',
    status: '',
    role: 'Amor',
    viewCount: '♡',
    socials: [
      { label: 'Discord', url: 'https://discord.com/users/1439283422190370906' },
      { label: 'Instagram', url: 'https://www.instagram.com/ihavebadfeeling/' },
    ],
    discordUserId: '1439283422190370906',
  },
];

app.get('/api/profiles', (_req, res) => {
  res.json(profiles);
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
