import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksBoardModule } from './tasks/pages/tasks-board/tasks-board.module';
import { FeaturesRoutingModule } from './features-routing.module';
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
