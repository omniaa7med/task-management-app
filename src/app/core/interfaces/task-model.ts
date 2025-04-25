import { Observable } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: TaskStatus;
}

export interface TaskList {
  status: TaskStatus;
  connectedDropLists: TaskStatus[];
  tasks: Task[];
  statusColor: string;
}

export enum TaskStatus {
  ToDo = 'ToDo',
  InProgress = 'InProgress',
  Done = 'Done',
}
