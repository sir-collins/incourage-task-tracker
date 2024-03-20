import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PersistOptions,
  persist as persistMiddleware,
} from "zustand/middleware";
import { TaskState } from "./types";
import { Task, TaskStatus } from "../types/task";

// Helper function to convert a date to a similar format without time component
const formatDate = (dateString: any): string => {
  try {
    // Convert the date string to a JavaScript Date object
    const date = new Date(dateString);

    // Check if the converted date is a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return ''; // Return an empty string for invalid dates
    }
    
    // Return the date in the desired format
    return date.toLocaleDateString();
  } catch (error) {
    console.error('Error formatting date:', error);
    return ''; // Return an empty string if formatting fails
  }
};



type AsyncStorage = {
  getItem: (name: string) => Promise<string | null>;
  setItem: (name: string, value: string) => Promise<void>;
  removeItem: (name: string) => Promise<void>;
};

const asyncStorage: AsyncStorage = {
  getItem: async (key) => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error("Error getting item from AsyncStorage:", error);
      return null;
    }
  },
  setItem: async (key, newValue) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("Error setting item in AsyncStorage:", error);
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
    }
  },
};

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
    }),
    persistOptions
  )
);

export default useTaskStore;
