import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { MaterialModule } from '../../shared/material/material.module';
import { EnrollmentFormComponent } from './components/enrollment-form/enrollment-form.component';

@NgModule({
  declarations: [EnrollmentFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    EnrollmentRoutingModule
    
  ]
})
export class EnrollmentModule {}
