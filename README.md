# Portfolio Dev

Infra inicial de portfolio pronta para evoluir com novos projetos e usar em plataformas de freela.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- ESLint

## Rodando local

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
npm run preview
```

## Arquitetura base

```text
src/
  app/            # composicao principal da aplicacao
  components/     # layout e blocos reutilizaveis
  data/           # dados de portfolio para editar rapido
  sections/       # secoes da pagina (hero, projetos, etc)
  types/          # tipos TypeScript
```

## Onde personalizar rapido

- Dados de conteudo: `src/data/portfolio.ts`
- Layout principal: `src/app/App.tsx`
- Visual global e tokens: `src/index.css`
- Tema Tailwind: `tailwind.config.js`

## Alias de import

O alias `@/` ja esta configurado para apontar para `src/`.

Exemplo:

```ts
import { Header } from '@/components/layout/Header'
```
