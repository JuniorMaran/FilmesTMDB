# Testes Unitários - FilmesTMDB

## 📋 Visão Geral

Este projeto utiliza **Vitest** e **React Testing Library** para testes unitários. Os testes cobrem contextos, componentes e utilitários da aplicação.

## 🚀 Como Executar os Testes

### Executar todos os testes
```bash
npm run test
```

### Executar testes em modo watch
```bash
npm run test -- --watch
```

### Executar testes com UI interativa
```bash
npm run test:ui
```

### Executar testes com cobertura
```bash
npm run test:coverage
```

## 📁 Estrutura de Testes

```
src/
├── contexts/
│   └── __tests__/
│       ├── FavoriteMoviesContext.test.tsx
│       └── SearchContext.test.tsx
├── components/
│   ├── atoms/
│   │   └── __tests__/
│   │       ├── EmptyState.test.tsx
│   │       ├── HighlightedTitle.test.tsx
│   │       └── BoxImage.test.tsx
│   └── organisms/
│       └── __tests__/
│           └── Filter.test.tsx
└── utils/
    └── __tests__/
        └── dateUtils.test.ts
```

## 🧪 Testes Implementados

### 1. **FavoriteMoviesContext.test.tsx**
Testa a funcionalidade de favoritos:
- ✅ Adicionar filme aos favoritos
- ✅ Remover filme dos favoritos
- ✅ Verificar se um filme é favorito
- ✅ Limpar todos os favoritos
- ✅ Evitar duplicatas
- ✅ Persistência em localStorage

### 2. **SearchContext.test.tsx**
Testa o contexto de busca:
- ✅ Inicializar com termo vazio
- ✅ Atualizar termo de busca
- ✅ Limpar termo de busca
- ✅ Validar uso dentro do provider

### 3. **EmptyState.test.tsx**
Testa o componente de estado vazio:
- ✅ Renderizar título e descrição
- ✅ Renderizar ícone quando fornecido
- ✅ Renderizar botão com link
- ✅ Validar atributos do link

### 4. **HighlightedTitle.test.tsx**
Testa o destaque de termo de busca:
- ✅ Renderizar sem highlight quando vazio
- ✅ Destacar termo correspondente
- ✅ Case-insensitive matching
- ✅ Múltiplas ocorrências
- ✅ Caracteres especiais

### 5. **BoxImage.test.tsx**
Testa o componente de imagem:
- ✅ Renderizar placeholder quando vazio
- ✅ Renderizar imagem quando fornecida
- ✅ Classes de tamanho correto
- ✅ Ícone no placeholder
- ✅ Cantos arredondados

### 6. **Filter.test.tsx**
Testa o componente de filtro:
- ✅ Renderizar componente
- ✅ Exibir contagem de itens
- ✅ Label customizável
- ✅ Callback ao mudar ordenação
- ✅ Todas as opções disponíveis

### 7. **dateUtils.test.ts**
Testa utilitários de data:
- ✅ Formatar data corretamente
- ✅ Locale em português
- ✅ Datas especiais (leap year, fim de ano)

## 🔧 Configuração

### vite.config.ts
```typescript
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setup.ts',
}
```

### src/test/setup.ts
- Mock de localStorage
- Mock de window.matchMedia
- Cleanup automático após cada teste

## 📊 Cobertura de Testes

Para visualizar a cobertura de testes:
```bash
npm run test:coverage
```

## 🎯 Próximos Passos

Testes adicionais podem ser implementados para:
- [ ] Componentes de página (Home, Favorites, SearchResults, MovieDetails)
- [ ] Componentes de molécula (MovieBox, SearchMovieBox, FavoriteMovieBox)
- [ ] Serviço TMDB (tmdbService)
- [ ] Testes de integração
- [ ] Testes E2E com Playwright/Cypress

## 📝 Boas Práticas

1. **Nomenclatura**: Use `*.test.tsx` ou `*.test.ts` para arquivos de teste
2. **Organização**: Coloque testes no diretório `__tests__` próximo ao arquivo testado
3. **Descrição**: Use `describe` e `it` com descrições claras
4. **Mocks**: Mock dependências externas (APIs, localStorage, etc)
5. **Cleanup**: Sempre limpe estado entre testes

## 🐛 Troubleshooting

### Erro: "Cannot find module '@/...'"
Certifique-se de que o alias `@` está configurado em `vite.config.ts`

### Erro: "localStorage is not defined"
O mock de localStorage está em `src/test/setup.ts`

### Testes lentos
Use `--reporter=verbose` para ver quais testes estão lentos

## 📚 Referências

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

