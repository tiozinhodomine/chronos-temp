# Chronos — Pomodoro Timer

Aplicação de timer Pomodoro feita com **React + TypeScript + Vite**.

## Funcionalidades

- Criar tarefas com nome e tipo de ciclo (foco / descanso curto / descanso longo)
- Timer em contagem regressiva real via **Web Worker**
- Interromper tarefa em andamento
- Histórico de tarefas (concluídas e interrompidas)
- Filtros no histórico: **Todas / Concluídas / Interrompidas**
- Busca pelo nome da tarefa
- Páginas com **React Router**: Home, Histórico, Sobre o Pomodoro e 404
- Context + `useReducer` com actions tipadas
- Persistência em **localStorage** (dados não somem no F5)
- Tema claro/escuro + identidade visual própria (cores, tipografia, logo)

## Como rodar

Pré-requisitos: **Node.js 18+** e npm.

```bash
# 1. Entre na pasta do projeto
cd chronos

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Abra o endereço que aparecer no terminal (geralmente `http://localhost:5173`).

### Outros comandos

```bash
npm run build    # build de produção
npm run preview  # preview do build
npm run lint     # lint com oxlint
```

## Estrutura

```
src/
  components/   # UI reutilizável
  contexts/     # TaskContext + reducer
  models/       # tipos TaskModel / TaskStateModel
  pages/        # Home, History, About, NotFound
  templates/    # layout principal
  utils/        # helpers de ciclo e formatação
  workers/      # Web Worker do timer
```

## Tempos padrão (Pomodoro clássico)

| Ciclo            | Minutos |
|------------------|---------|
| Foco             | 25      |
| Descanso curto   | 5       |
| Descanso longo   | 15      |

A cada 4 ciclos de foco, o próximo descanso é o longo.
