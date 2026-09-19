import { useEffect, useReducer, useRef } from "react";

import { TimerWorkerManager } from "../../workers/timerWorkerManager";
import type { TaskStateModel } from "../../models/taskStateModel";

import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./taskContext";
import { taskReducer } from "./taskReducer";
import { TaskActionTypes } from "./taskActions";

const STORAGE_KEY = "chronos-state";

function loadState(): TaskStateModel {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialTaskState;

    const parsed = JSON.parse(raw) as TaskStateModel;

    // Ao recarregar a página, interrompe tarefa ativa (não há timer vivo)
    return {
      ...initialTaskState,
      ...parsed,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
      config: {
        ...initialTaskState.config,
        ...(parsed.config ?? {}),
      },
    };
  } catch {
    return initialTaskState;
  }
}

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, undefined, loadState);
  const workerRef = useRef<TimerWorkerManager | null>(null);
  const lastActiveIdRef = useRef<string | null>(null);

  // Persistir no localStorage
  useEffect(() => {
    const toSave: TaskStateModel = {
      ...state,
      // não salva timer em andamento de forma "viva"
      activeTask: state.activeTask,
      secondsRemaining: state.secondsRemaining,
      formattedSecondsRemaining: state.formattedSecondsRemaining,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [state]);

  // Worker: inicia quando surge nova activeTask
  useEffect(() => {
    const activeId = state.activeTask?.id ?? null;

    if (!state.activeTask) {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      lastActiveIdRef.current = null;
      return;
    }

    // Só reinicia o worker se for uma tarefa nova
    if (activeId === lastActiveIdRef.current && workerRef.current) {
      return;
    }

    if (workerRef.current) {
      workerRef.current.terminate();
    }

    const worker = TimerWorkerManager.getInstance();
    workerRef.current = worker;
    lastActiveIdRef.current = activeId;

    worker.onmessage((e) => {
      const countDownSeconds = e.data as number;

      if (countDownSeconds <= 0) {
        dispatch({ type: TaskActionTypes.COMPLETE_TASK });
        worker.terminate();
        workerRef.current = null;
        lastActiveIdRef.current = null;
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });

    worker.postMessage(state);
  }, [state.activeTask?.id]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
