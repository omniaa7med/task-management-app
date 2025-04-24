import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskStatus } from '../../../../core/interfaces/task-model';

@Component({
  selector: 'app-task-card',
  standalone: false,
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<Task>();
  taskStatus = TaskStatus;
}
