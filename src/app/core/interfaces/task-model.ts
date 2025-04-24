export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: TaskStatus;
}

export enum TaskStatus {
  ToDo = 'ToDo',
  InProgress = 'InProgress',
  Done = 'Done',
}
