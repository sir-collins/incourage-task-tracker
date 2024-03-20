import { Task, TaskStatus } from '../types/task';

export interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  getTodayTasks: () => Task[];
  getTomorrowTasks: () => Task[];
  getThisWeekTasks: () => Task[];
  getTasksByStatus: (status: TaskStatus) => Task[];
}


export interface GroupedTasks {
  overdue: Task[];
  today: Task[];
  thisWeek: Task[];
  future: Task[];
}