import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';     
import { StudentsRoutingModule } from './students-routing.module';
import { MaterialModule } from '../../shared/material/material.module'; 


import { StudentCrudComponent } from './pages/crud/student-crud.component';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentListComponent } from './pages/list/student-list.component';
import { StudentDetailComponent } from './pages/detail/student-detail.component';

@NgModule({
  declarations: [
    StudentCrudComponent,
    StudentDialogComponent,
    StudentListComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,            
    ReactiveFormsModule,    
    MaterialModule,        
    StudentsRoutingModule
  ]
})
export class StudentsModule {}
