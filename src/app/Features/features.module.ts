import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksBoardModule } from './tasks/pages/tasks-board.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { ToastNotifComponent } from './dialog/toast-notif/toast-notif.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { TaskFormModule } from './tasks/components/task-form/task-form.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TasksBoardModule,
    TaskFormModule,
    FeaturesRoutingModule,
  ],
  exports: [],
})
export class FeaturesModule {}
