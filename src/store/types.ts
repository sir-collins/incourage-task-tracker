import { List, Task, TaskStatus } from '../types/task';

export interface TaskState {
  tasks: Task[];
  lists: List[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  getTodayTasks: () => Task[];
  getTomorrowTasks: () => Task[];
  getThisWeekTasks: () => Task[];
  getOverdueTasks: () => Task[];
  getTasksByStatus: (status: TaskStatus) => Task[];
  createList: (label: string) => void;
  updateList: (listId: string, newLabel: string) => void;
  deleteList: (listId: string) => void;
}


export interface GroupedTasks {
  overdue: Task[];
  today: Task[];
  thisWeek: Task[];
  future: Task[];
}