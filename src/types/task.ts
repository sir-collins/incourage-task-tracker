export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
  }
  
  export enum TaskStatus {
    Pending = 'pending',
    InProgress = 'in progress',
    Completed = 'completed',
  }