import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'students',
    loadChildren: () =>
      import('./features/students/students.module').then(m => m.StudentsModule)
  },
  {
    path: 'enrollment',
    loadChildren: () =>
      import('./features/enrollment/enrollment.module').then(m => m.EnrollmentModule)
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./features/schedule/schedule.module').then(m => m.ScheduleModule)
  },
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
