import { useMemo, useState } from "react";
import { Trash2Icon } from "lucide-react";

import { Container } from "../../components/container";
import { Heading } from "../../components/heading";
import { DefaultButton } from "../../components/defaultButton";
import { MainTemplate } from "../../templates/mainTemplates";
import { useTaskContext } from "../../contexts/taskContext/useTaskContext";
import { TaskActionTypes } from "../../contexts/taskContext/taskActions";

import styles from "./styles.module.css";

type FilterType = "all" | "completed" | "interrupted";

const typeLabels = {
  workTime: "Foco",
  shortBreakTime: "Descanso curto",
  longBreakTime: "Descanso longo",
} as const;

function formatDate(ts: number) {
  return new Date(ts).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function History() {
  const { state, dispatch } = useTaskContext();
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return state.tasks
      .filter((task) => {
        if (filter === "completed") return task.completeDate !== null;
        if (filter === "interrupted") return task.interruptDate !== null;
        return true;
      })
      .filter((task) => {
        if (!query) return true;
        return task.name.toLowerCase().includes(query);
      })
      .slice()
      .reverse();
  }, [state.tasks, filter, search]);

  function handleClearHistory() {
    if (!confirm("Tem certeza que deseja apagar todo o histórico?")) return;
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }

  function statusOf(task: (typeof state.tasks)[0]) {
    if (task.completeDate) return { label: "Concluída", className: styles.completed };
    if (task.interruptDate) return { label: "Interrompida", className: styles.interrupted };
    return { label: "Em andamento", className: styles.running };
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Histórico</Heading>

        <div className={styles.toolbar}>
          <input
            className={styles.search}
            type="search"
            placeholder="Buscar pelo nome da tarefa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar tarefas pelo nome"
          />

          <div className={styles.filters} role="group" aria-label="Filtrar histórico">
            <button
              type="button"
              className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""}`}
              onClick={() => setFilter("all")}
            >
              Todas
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${filter === "completed" ? styles.active : ""}`}
              onClick={() => setFilter("completed")}
            >
              Concluídas
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${filter === "interrupted" ? styles.active : ""}`}
              onClick={() => setFilter("interrupted")}
            >
              Interrompidas
            </button>
          </div>

          {state.tasks.length > 0 && (
            <DefaultButton
              type="button"
              color="red"
              icon={<Trash2Icon />}
              title="Limpar histórico"
              aria-label="Limpar histórico"
              onClick={handleClearHistory}
            />
          )}
        </div>

        {filteredTasks.length === 0 ? (
          <p className={styles.empty}>
            Nenhuma tarefa encontrada. Inicie um ciclo na página inicial!
          </p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tarefa</th>
                  <th>Duração</th>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th>Início</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => {
                  const status = statusOf(task);
                  return (
                    <tr key={task.id}>
                      <td data-label="Tarefa">{task.name}</td>
                      <td data-label="Duração">{task.duration} min</td>
                      <td data-label="Tipo">{typeLabels[task.type]}</td>
                      <td data-label="Status">
                        <span className={`${styles.badge} ${status.className}`}>
                          {status.label}
                        </span>
                      </td>
                      <td data-label="Início">{formatDate(task.startDate)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </MainTemplate>
  );
}
