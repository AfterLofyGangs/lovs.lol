# lovs.lol

Site reestruturado em React, TypeScript e Node com uma interface limpa e moderna.

## Estrutura

- `src/` - código do frontend React
- `server/` - backend Node/Express
- `dist/` - build do frontend gerado pelo Vite
- `dist-server/` - build do servidor TypeScript

## Comandos

- `npm install` - instalar dependências
- `npm run dev` - iniciar o frontend Vite e o backend Node em modo de desenvolvimento
- `npm run build` - gerar o build do frontend e compilar o servidor
- `npm run start` - iniciar o servidor Node a partir do build

## Funcionalidades

- Landing page interativa com animação clean
- Página principal com cards de perfil e ícones sociais
- Player de música de fundo com controle de pausa/reprodução
- Atualização automática de avatares do Discord via API pública
- Backend Node/Express com endpoint `GET /api/profiles`
