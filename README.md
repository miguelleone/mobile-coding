# Mobile Coding Project

Aplicação mobile desenvolvida com **Ionic + Angular 20**, utilizando a **API da Wikipedia** para busca e exibição de artigos.

## Tecnologias

- [Ionic 8](https://ionicframework.com/)
- [Angular 20](https://angular.dev/) (standalone components)
- Wikipedia REST API + MediaWiki API

## Estrutura de serviços

```
src/app/core/services/
├── http.service.ts       # Wrapper genérico do HttpClient
└── wikipedia.service.ts  # Integração com a API da Wikipedia
```

## Comandos

### Instalar dependências
```bash
npm install
```

### Iniciar em modo de desenvolvimento
```bash
npx ng serve
```
Acesse em: `http://localhost:4200`

### Build de produção
```bash
npx ng build --configuration production
```

### Rodar testes unitários
```bash
npx ng test
```
