import { Task } from '../interfaces/task-model';

export class LoadTasks {
  static readonly type = '[Tasks] Load';
}

export class CreateTask {
  static readonly type = '[Tasks] Create';
  constructor(public task: Task) {}
}

export class UpdateTask {
  static readonly type = '[Tasks] Update';
  constructor(public task: Task) {}
}

export class DeleteTask {
  static readonly type = '[Tasks] Delete';
  constructor(public id: string) {}
}

export class UpdateTaskStatus {
  static readonly type = '[Tasks] Reorder';
  constructor(public id: string, public newStatus: Task['status'] | string) {}
}
