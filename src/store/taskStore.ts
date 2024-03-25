import { create } from "zustand";
import {
  PersistOptions,
  persist as persistMiddleware,
} from "zustand/middleware";
import { TaskState } from "./types";
import { Task, TaskStatus } from "../types/task";
import { asyncStorage } from "../utils/storageUtils";
import { format, isToday, isTomorrow, isAfter, isBefore } from 'date-fns';
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
      searchResults: [],
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
          searchResults: state.searchResults.filter(
            (task) => task.id !== taskId
          ),
        })),
      getTodayTasks: (): Task[] => {
        return useTaskStore
          .getState()
          .tasks.filter(
            (task) =>
              isToday(new Date(task.dueDate)) &&
              task.status !== TaskStatus.Completed
          );
      },
      getTomorrowTasks: (): Task[] => {
        return useTaskStore
          .getState()
          .tasks.filter(
            (task) =>
              isTomorrow(new Date(task.dueDate)) &&
              task.status !== TaskStatus.Completed
          );
      },
      getThisWeekTasks: (): Task[] => {
        const today = new Date();
        const endOfWeek = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000); // End of the week
        return useTaskStore
          .getState()
          .tasks.filter(
            (task) =>
              isAfter(new Date(task.dueDate), new Date()) &&
              isBefore(new Date(task.dueDate), endOfWeek) &&
              task.status !== TaskStatus.Completed
          );
      },
      getTasksByStatus: (status: TaskStatus): Task[] => {
        return useTaskStore
          .getState()
          .tasks.filter((task) => task.status === status);
      },
      getOverdueTasks: (): Task[] => {
        return useTaskStore
          .getState()
          .tasks.filter(
            (task) =>
              isBefore(new Date(task.dueDate), new Date()) &&
              task.status !== TaskStatus.Completed
          );
      },
      createList: (label) =>
        set((state) => ({
          lists: [...state.lists, { id: String(Math.random()), label }],
        })),
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
        searchTasks: (searchText) => {
          let filteredTasks: Task[] = [];
          if (searchText.trim() === '') {
              filteredTasks = [];
          } else {
              filteredTasks = get().tasks.filter((task) =>
                  task.title.toLowerCase().includes(searchText.toLowerCase())
              );
          }
          set({ searchResults: filteredTasks });
      },
      
      clearSearchResults: () => set({ searchResults: [] }),
    }),
    persistOptions
  )
);

export default useTaskStore;
