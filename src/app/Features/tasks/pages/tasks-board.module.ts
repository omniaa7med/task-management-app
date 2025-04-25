import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from '../components/tasks-list/tasks-list.component';
import { TasksBoardComponent } from './tasks-board/tasks-board.component';
import { TaskCardComponent } from '../components/task-card/task-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskFormModule } from '../components/task-form/task-form.module';
import { TaskBoradRoutingModule } from './task-board-routing.module';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { ToastNotifComponent } from '../../dialog/toast-notif/toast-notif.component';

@NgModule({
  declarations: [
    TasksListComponent,
    TasksBoardComponent,
    TaskCardComponent,
    ConfirmDialogComponent,
    ToastNotifComponent,
  ],
  imports: [
    CommonModule,
    TaskFormModule,
    DragDropModule,
    TaskBoradRoutingModule,
  ],
  exports: [TasksBoardComponent, ConfirmDialogComponent, ToastNotifComponent],
})
export class TasksBoardModule {}
