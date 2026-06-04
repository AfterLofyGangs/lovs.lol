"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 4000);
const distPath = path_1.default.resolve(__dirname, '../dist');
app.use(express_1.default.json());
app.use(express_1.default.static(distPath));
const profiles = [
    {
        id: 'mis',
        displayName: 'mis',
        status: '-3',
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
        status: '-3',
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
    res.sendFile(path_1.default.resolve(distPath, 'index.html'));
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
