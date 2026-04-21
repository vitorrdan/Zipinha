# Zipinha

Sistema simples de envio de atividades de programação, com foco em programação web.

O Zipinha foi pensado como uma alternativa viável, leve e de fácil entendimento para apoiar as oficinas de programação do projeto de extensão Beira Linha. A ideia é oferecer uma experiência direta para alunos e monitores, sem exigir uma interface complexa ou uma curva de aprendizado alta.

A funcionalidade principal do sistema é o envio automático das atividades por e-mail para o monitor, facilitando o acompanhamento das entregas em tempo real.

## Objetivo

O sistema permite que o aluno envie uma atividade com:

- nome do aluno
- nome da atividade
- arquivo anexado

Do outro lado, o monitor consegue visualizar as entregas recebidas e remover registros quando necessário.

No futuro, essa funcionalidade pode ser expandida para criar automaticamente pastas no Google Drive e no Workspace, permitindo que os monitores acessem simultaneamente as atividades entregues em um ambiente centralizado.

## Estrutura do projeto

O repositório está organizado em duas partes:

- `backend/`: API responsável por receber, listar e gerenciar as entregas
- `zipinha-frontend/`: interface web em React para alunos e monitores

## Tecnologias usadas

- Frontend: React, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express, SQLite, Multer, CORS, Nodemailer

## Como executar localmente

### 1. Backend

Entre na pasta `backend` e instale as dependências:

```bash
cd backend
npm install
```

Depois inicie o servidor:

```bash
npm run dev
```

Por padrão, o backend sobe na porta `3001`.

### 2. Frontend

Em outro terminal, entre na pasta `zipinha-frontend` e instale as dependências:

```bash
cd zipinha-frontend
npm install
```

Depois rode a interface web:

```bash
npm run dev
```

O frontend normalmente fica disponível em `http://localhost:5173`.

## Funcionalidades principais

- envio de atividade pelo aluno
- envio automático de e-mail com as atividades para o monitor
- autenticação simples do monitor por senha
- listagem das entregas recebidas
- remoção de entregas pelo monitor

## Contexto de uso

Este projeto foi desenvolvido para atender oficinas de programação web dentro do projeto de extensão Beira Linha, funcionando como uma solução prática para coleta de atividades e acompanhamento das entregas em sala.

## Observação

Se o projeto for usado em outro computador, verifique as variáveis de ambiente do backend e a URL liberada para o frontend, caso seja necessário ajustar a comunicação entre as partes.