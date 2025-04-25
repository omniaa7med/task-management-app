import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../core/interfaces/task-model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks-list',
  standalone: false,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  @Input() title!: Task['status'];
  @Input() tasks: Task[] | any = [];
  @Output() taskDropped = new EventEmitter<{
    task: Task;
    newStatus: Task['status'];
  }>();
  @Output() removeTask = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<Task>();
  @Input() connectedDropLists!: Task['status'][];

  ngOnChanges() {
    this.tasks = this.sortDueDate();
  }
  // sort tasks by date Asc
  sortDueDate(): Task[] {
    return this.tasks.sort(
      (task1: Task, task2: Task) =>
        new Date(task1.dueDate).getTime() - new Date(task2.dueDate).getTime()
    );
  }
  // handle drop task in container
  onDrop(event: CdkDragDrop<Task[]>) {
    const task = event.item.data;
    const newStatus: any = event.container.id;
    if (newStatus && event.container.id != event.item.data.status) {
      this.taskDropped.emit({ task, newStatus });
    }
  }
}
