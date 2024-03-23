import { create } from "zustand";
import {
  PersistOptions,
  persist as persistMiddleware,
} from "zustand/middleware";
import { TaskState } from "./types";
import { Task, TaskStatus } from "../types/task";
import { asyncStorage } from "../utils/storageUtils";
import { formatDate } from "../utils/dateUtils";
import { nanoid } from "nanoid";

const persistOptions: PersistOptions<TaskState, TaskState> = {
  name: "task-store", // unique name
  storage: {
    getItem: async (name) => {
      const storedValue = await asyncStorage.getItem(name);
      return storedValue ? { state: JSON.parse(storedValue) } : null;
    },
    setItem: async (name, value) =>
      asyncStorage.setItem(name, JSON.stringify(value.state)),
    removeItem: async (name) => asyncStorage.removeItem(name),
  },
};

const useTaskStore = create(
  persistMiddleware<TaskState>(
    (set, get) => ({
      tasks: [],
      lists: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (taskId, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
          ),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
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
      getOverdueTasks: (): Task[] => {
        const today = new Date();
        return useTaskStore
          .getState()
          .tasks.filter(
            (task) =>
              task.dueDate < today && task.status !== TaskStatus.Completed
          );
      },
      createList: (label) =>
        set((state) => ({ lists: [...state.lists, { id: String(Math.random()), label }] })),
      updateList: (listId, newLabel) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId ? { ...list, label: newLabel } : list
          ),
        })),
      deleteList: (listId) =>
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== listId),
          tasks: state.tasks.map((task) =>
            task.listId === listId ? { ...task, listId: undefined } : task
          ),
        })),
    }),
    persistOptions
  )
);

export default useTaskStore;
