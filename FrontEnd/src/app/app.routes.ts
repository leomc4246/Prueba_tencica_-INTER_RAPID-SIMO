import { Routes } from '@angular/router';

export const appRoutes: Routes = [
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
    path: 'schedule/:id',
    loadChildren: () =>
      import('./features/schedule/schedule.module').then(m => m.ScheduleModule)
  },
  { path: '', redirectTo: 'students', pathMatch: 'full' }
];
