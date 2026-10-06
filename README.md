# Miss Brand

Projeto completo atualizado em 06/10/2026, preparado para Next.js e Vercel. Inclui imagens, logo, vídeo, animações, WhatsApp, localizações e Instagram.

## VS Code

Clone o repositório e abra a pasta `miss-brand`. Use Node.js 22.13 ou superior.

```bash
corepack enable
corepack pnpm install
corepack pnpm dev
```

Acesse http://localhost:3000. Para verificar produção: `corepack pnpm build`.

## Verificação

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm build
corepack pnpm start
```

Confira a navegação entre seções, a abertura e o fechamento do FAQ, imagens e vídeo, e os destinos dos links de WhatsApp, Google Maps e Instagram em desktop e celular. Com movimento reduzido habilitado, o vídeo fica pausado e as animações são desativadas. O conteúdo das seções também permanece visível sem JavaScript.

## GitHub e Vercel

1. Envie o conteúdo da pasta para um repositório GitHub, sem node_modules ou .next.
2. Importe o repositório na Vercel, framework Next.js.
3. Raiz: pasta com package.json. Instalação: pnpm install. Build: pnpm build. Saída: padrão do Next.js.
4. Clique em Deploy. Não exige banco de dados ou variáveis de ambiente.

O site é institucional e não exige banco de dados ou variáveis de ambiente. Os dados de contato ficam em `app/page.tsx`.
