import { Observable } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: TaskStatus;
}

export interface TaskList {
  title: TaskStatus;
  connectedDropLists: TaskStatus[];
  tasks: Observable<Task[]>;
  titleColor: string;
}

export enum TaskStatus {
  ToDo = 'ToDo',
  InProgress = 'InProgress',
  Done = 'Done',
}
