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

  constructor(private store: Store) {}

  ngOnInit() {
    this.handleTaskState();
    this.taskList = this.createTaskList();
  }

  handleTaskState() {
    this.store.dispatch(new LoadTasks());

    // get tasks by status
    this.todo$ = this.store.select(
      TaskSelectors.selectTasksByStatus(TaskStatus.ToDo)
    );
    this.inProgress$ = this.store.select(
      TaskSelectors.selectTasksByStatus(TaskStatus.InProgress)
    );
    this.done$ = this.store.select(
      TaskSelectors.selectTasksByStatus(TaskStatus.Done)
    );
  }

  createTaskList() {
    return [
      {
        title: this.taskStatus.ToDo,
        connectedDropLists: [this.taskStatus.InProgress, this.taskStatus.Done],
        tasks: this.todo$,
        titleColor: 'text-blue-600',
      },
      {
        title: this.taskStatus.InProgress,
        connectedDropLists: [this.taskStatus.ToDo, this.taskStatus.Done],
        tasks: this.inProgress$,
        titleColor: 'text-yellow-600',
      },
      {
        title: this.taskStatus.Done,
        connectedDropLists: [this.taskStatus.ToDo, this.taskStatus.InProgress],
        tasks: this.done$,
        titleColor: 'text-green-600',
      },
    ];
  }

  // update task status when drop
  onTaskDrop(event: { task: Task; newStatus: Task['status'] | string }) {
    this.store.dispatch(new UpdateTaskStatus(event.task.id, event.newStatus));
  }

  // open form dialog to handle add or edit
  openTaskForm(task: Task | null = null) {
    this.taskToEdit = task;
    this.openFormTask = true;
  }

  // Handle form submission
  handleFormSubmit(task: Task) {
    this.store.dispatch(task.id ? new UpdateTask(task) : new CreateTask(task));
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
}
