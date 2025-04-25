import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  TaskStatus,
  Task,
  TaskList,
} from '../../../../core/interfaces/task-model';
import {
  LoadTasks,
  UpdateTaskStatus,
  UpdateTask,
  CreateTask,
  DeleteTask,
} from '../../../../core/state/task.actions';
import { TaskSelectors } from '../../../../core/state/task.selectors';
import { ToastNotifService } from '../../../../core/services/toast-notifi.service';

@Component({
  selector: 'app-tasks-board',
  standalone: false,
  templateUrl: './tasks-board.component.html',
  styleUrl: './tasks-board.component.scss',
})
export class TasksBoardComponent {
  taskStatus = TaskStatus;
  todo$!: Observable<Task[]>;
  inProgress$!: Observable<Task[]>;
  done$!: Observable<Task[]>;
  openFormTask: boolean = false;
  taskToEdit!: Task | null;
  isConfirmOpen = false;
  taskToDelete!: Task['id'];
  taskList!: TaskList[];

  constructor(
    private store: Store,
    private _toastNotifiService: ToastNotifService
  ) {}

  ngOnInit() {
    this.handleTaskState();
  }

  handleTaskState() {
    this.store.dispatch(new LoadTasks());

    // get all tasks and create tasks list ui
    this.store.select(TaskSelectors.allTasks()).subscribe((tasks: any) => {
      this.taskList = this.createTaskList(tasks.tasks);
    });
  }

  //  create taskList ui
  createTaskList(allTasks: Task[]): TaskList[] {
    return [
      {
        status: this.taskStatus.ToDo,
        connectedDropLists: [this.taskStatus.InProgress, this.taskStatus.Done],
        tasks: allTasks.filter((t) => t.status === this.taskStatus.ToDo),
        statusColor: 'text-blue-600',
      },
      {
        status: this.taskStatus.InProgress,
        connectedDropLists: [this.taskStatus.ToDo, this.taskStatus.Done],
        tasks: allTasks.filter((t) => t.status === this.taskStatus.InProgress),
        statusColor: 'text-yellow-600',
      },
      {
        status: this.taskStatus.Done,
        connectedDropLists: [this.taskStatus.ToDo, this.taskStatus.InProgress],
        tasks: allTasks.filter((t) => t.status === this.taskStatus.Done),
        statusColor: 'text-green-600',
      },
    ];
  }

  // update task status when drop
  onTaskDrop(event: { task: Task; newStatus: Task['status'] }) {
    const updatedTask: Task = { ...event.task, status: event.newStatus };

    // first when drop update ui
    this.taskList = this.taskList.map((list) => {
      return {
        ...list,
        tasks: list.tasks
          .filter((task: Task) => task.id !== event.task.id)
          .concat(list.status === event.newStatus ? [updatedTask] : []),
      };
    });

    // secound update api
    this.store.dispatch(
      new UpdateTaskStatus(updatedTask.id, updatedTask.status)
    );

    if (updatedTask.status === this.taskStatus.Done)
      this.toastNotifiTaskDone(updatedTask);
  }

  // open form dialog to handle add or edit
  openTaskForm(task: Task | null = null) {
    this.taskToEdit = task;
    this.openFormTask = true;
  }

  // Handle form submission
  handleFormSubmit(task: Task) {
    this.store.dispatch(task.id ? new UpdateTask(task) : new CreateTask(task));
    if (task.status === this.taskStatus.Done) this.toastNotifiTaskDone(task);
    this.closeDialog();
  }

  // close form dialog
  closeDialog() {
    this.openFormTask = false;
    this.taskToEdit = null;
  }

  // delete task bu id
  deleteTask(id: string) {
    this.taskToDelete = id;
    this.isConfirmOpen = true;
  }

  // delete task bu id after confirmation
  handleDeleteTaskAfterConfirm(confirmed: boolean) {
    if (confirmed) this.store.dispatch(new DeleteTask(this.taskToDelete));
    this.isConfirmOpen = false;
  }

  // handle toast notification when task is done
  toastNotifiTaskDone(task: Task) {
    this._toastNotifiService.show(`${task.title} is done`);
  }
}
