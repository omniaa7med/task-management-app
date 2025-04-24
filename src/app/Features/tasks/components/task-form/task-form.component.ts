import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task, TaskStatus } from '../../../../core/interfaces/task-model';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  @Input() task!: Task | null;
  @Output() formSubmitted = new EventEmitter<Task>();
  @Output() cancelled = new EventEmitter<void>();
  taskStatus = TaskStatus;
  taskForm!: FormGroup;
  todayDate: any;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {}

  ngOnInit() {
    this.getTodayDate();
    this.buildTaskForm();
  }

  getTodayDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.todayDate = this.datePipe.transform(today, 'yyyy-MM-dd');
  }

  buildTaskForm() {
    const initial: Task | any = this.task || {};
    this.taskForm = this.fb.group({
      title: [initial.title || '', [Validators.required]],
      description: [initial.description || ''],
      dueDate: [
        initial.dueDate || this.todayDate,
        [Validators.required, this.handleErrorPastDate],
      ],
      status: [initial.status || TaskStatus.ToDo],
    });
  }

  handleErrorPastDate(control: any) {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate < today ? { pastDate: true } : null;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task: Task = {
        ...this.taskForm.value,
      };

      this.task?.id ? (task.id = this.task?.id) : null;
      this.formSubmitted.emit(task);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
