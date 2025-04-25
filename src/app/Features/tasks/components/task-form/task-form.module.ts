import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';

@NgModule({
  declarations: [TaskFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DatePipe],
  exports: [TaskFormComponent],
})
export class TaskFormModule {}
