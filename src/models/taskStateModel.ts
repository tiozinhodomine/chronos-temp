import type { TaskModel } from "./taskModel";

// This file defines the TaskStateModel type, which represents the state of a task in the application.

export type TaskStateModel = {
  tasks: TaskModel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activeTask: TaskModel | null;
  currentCycle: number;

  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};