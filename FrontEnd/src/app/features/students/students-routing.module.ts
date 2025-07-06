import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './pages/list/student-list.component';
import { StudentDetailComponent } from './pages/detail/student-detail.component';
import { StudentCrudComponent } from './pages/crud/student-crud.component';

const routes: Routes = [
  { path: '', component: StudentListComponent }, 
  { path: 'crud', component: StudentCrudComponent },
  { path: ':id', component: StudentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
