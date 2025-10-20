# FilmesTMDB

Aplicação web para explorar filmes usando a API do The Movie Database (TMDB). Permite buscar, ver detalhes e favoritar filmes.

## Tecnologias
- React + TypeScript (Vite)
- React Router
- @tanstack/react-query
- Tailwind CSS
- Axios
- Vitest + React Testing Library

## Pré‑requisitos
- Node.js 18+
- Yarn (recomendado) ou npm

## Variáveis de ambiente
Crie um arquivo `.env` (ou `.env.local`) na raiz do projeto:

```
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_KEY=SEU_TOKEN_TMDB
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
```

## Instalação
Com Yarn:
```
yarn
```
Com npm:
```
npm install
```

## Executar em desenvolvimento
```
yarn dev
# ou
npm run dev
```
A aplicação iniciará no endereço indicado pelo Vite (ex.: http://localhost:5173).

## Build e preview
```
yarn build && yarn preview
# ou
npm run build && npm run preview
```

## Testes e qualidade
Executar testes:
```
yarn test
# ou
npm run test
```
Cobertura de testes:
```
yarn test:coverage
# ou
npm run test:coverage
```
Lint:
```
yarn lint
# ou
npm run lint
```

## Estrutura (resumo)
```
src/
  components/
    atoms/
    molecules/
    organisms/
  pages/
  contexts/
  services/
  utils/
```
