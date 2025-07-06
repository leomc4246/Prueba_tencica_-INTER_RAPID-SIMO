import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './pages/schedule/schedule.component';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [CommonModule, MaterialModule, ScheduleRoutingModule]
})
export class ScheduleModule {}
