# Mobile Coding Project

Aplicação mobile desenvolvida com **Ionic + Angular 20** para consulta de clima em cidades selecionadas, utilizando a **API Open-Meteo**.

## Tecnologias

- [Ionic 8](https://ionicframework.com/)
- [Angular 20](https://angular.dev/) (standalone components)
- [Open-Meteo API](https://open-meteo.com/)
- HttpClient

## Funcionalidades

- Home com lista de cidades e clima atual.
- Página Details com previsão detalhada da cidade selecionada.
- Navegação com parâmetro de rota (`/details/:id`).
- Pipe built-in `DatePipe`.
- Pipe personalizada para formatar temperatura, vento e direção.
- Diretiva personalizada para destacar cards de clima.
- Diretivas estruturais `@if` e `@for`.

## Estrutura de serviços

```
src/app/core/services/
├── http.service.ts       # Wrapper genérico do HttpClient
└── open-meteo.service.ts # Integração com a API Open-Meteo
```

## Comandos

### Instalar dependências
```bash
npm install
```

### Iniciar em modo de desenvolvimento
```bash
ionic serve --port 8100
```
Acesse em: `http://localhost:8100`

### Build de produção
```bash
npx ng build --configuration production
```

### Rodar testes unitários
```bash
npx ng test
```
