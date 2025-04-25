import { createSelector, Selector } from '@ngxs/store';
import { TaskState } from './task.state';
import { Task } from '../interfaces/task-model';
import { TaskStateModel } from '../interfaces/taskState.modal';

export class TaskSelectors {
  @Selector()
  static allTasks() {
    return createSelector([TaskState], (state: TaskStateModel): Task[] => {
      return state.tasks;
    });
  }

  static selectTasksByStatus(status: Task['status']) {
    return createSelector([TaskState], (state: TaskStateModel): Task[] => {
      return !state || !Array.isArray(state.tasks)
        ? []
        : state.tasks.filter((task) => task.status === status);
    });
  }
}
