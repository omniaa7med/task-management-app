import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import {
  LoadTasks,
  CreateTask,
  UpdateTask,
  DeleteTask,
  UpdateTaskStatus,
} from './task.actions';
import {
  patch,
  updateItem,
  removeItem,
  insertItem,
} from '@ngxs/store/operators';
import { Task } from '../interfaces/task-model';
import { TaskStateModel } from '../interfaces/taskState.modal';
import { TaskApiService } from '../services/task-api.service';

//  to handle state inital
@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
  },
})
@Injectable()
export class TaskState {
  constructor(private _taskApiService: TaskApiService) {}

  @Action(LoadTasks)
  loadTasks(ctx: StateContext<TaskStateModel>) {
    return this._taskApiService.getAllTasks().pipe(
      tap((tasks: Task[]) => {
        ctx.patchState({ tasks });
      })
    );
  }

  @Action(CreateTask)
  createTask(ctx: StateContext<TaskStateModel>, action: CreateTask) {
    return this._taskApiService
      .createNewTask(action.task)
      .pipe(
        tap((newTask) => ctx.setState(patch({ tasks: insertItem(newTask) })))
      );
  }

  @Action(UpdateTask)
  updateTaskInfo(ctx: StateContext<TaskStateModel>, action: UpdateTask) {
    return this._taskApiService.updateTaskInfo(action.task).pipe(
      tap((updated) =>
        ctx.setState(
          patch({
            tasks: updateItem<Task>(
              (t) => t.id === updated.id,
              patch({ ...updated })
            ),
          })
        )
      )
    );
  }

  @Action(UpdateTaskStatus)
  updateTaskStatus(
    ctx: StateContext<TaskStateModel>,
    action: UpdateTaskStatus
  ) {
    return this._taskApiService
      .updateTaskStatus(action.id, action.newStatus)
      .pipe(
        tap((updated) =>
          ctx.setState(
            patch({
              tasks: updateItem<Task>(
                (t) => t.id === updated.id,
                patch({ status: updated.status })
              ),
            })
          )
        )
      );
  }

  @Action(DeleteTask)
  deleteTaskById(ctx: StateContext<TaskStateModel>, action: DeleteTask) {
    return this._taskApiService
      .deleteTaskById(action.id)
      .pipe(
        tap(() =>
          ctx.setState(
            patch({ tasks: removeItem<Task>((t) => t.id === action.id) })
          )
        )
      );
  }
}
