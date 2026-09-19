import type { TaskStateModel } from "./taskStateModel";

// This file defines the TaskModel type, which represents a task in the application.

export type TaskModel = {
  id: string;
  name: string;
  duration: number; // Duration in minutes
  startDate: number; // Timestamp of when the task was started
  completeDate: number | null; // Timestamp of when the task was completed
  interruptDate: number | null; // Timestamp of when the task was interrupted
  type: keyof TaskStateModel["config"]; // Type of task
};