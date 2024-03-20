import { create } from 'zustand';
import { TaskState } from './types';
import { Task, TaskStatus } from '../types/task';

// Helper function to convert a date to a similar format without time component
const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) })),
  getTodayTasks: (): Task[] => {
    const today = new Date();
    const todayDateString = formatDate(today);
    return useTaskStore
      .getState()
      .tasks.filter(
        (task) =>
          formatDate(task.dueDate) === todayDateString &&
          task.status !== TaskStatus.Completed
      );
  },
  getTomorrowTasks: (): Task[] => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateString = formatDate(tomorrow);
    return useTaskStore
      .getState()
      .tasks.filter(
        (task) =>
          formatDate(task.dueDate) === tomorrowDateString &&
          task.status !== TaskStatus.Completed
      );
  },
  getThisWeekTasks: (): Task[] => {
    const today = new Date();
    const endOfWeek = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000); // End of the week

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateString = formatDate(tomorrow);

    return useTaskStore
      .getState()
      .tasks.filter(
        (task) =>
          formatDate(task.dueDate) > tomorrowDateString &&
          formatDate(task.dueDate) <= formatDate(endOfWeek) &&
          task.status !== TaskStatus.Completed
      );
  },
  getTasksByStatus: (status: TaskStatus): Task[] => {
    return useTaskStore
      .getState()
      .tasks.filter((task) => task.status === status);
  },
}));

export default useTaskStore;
