import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../../../core/models/student.model';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html'
})
export class StudentDialogComponent {
  form = this.fb.nonNullable.group({
    id: [0],
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Partial<Student>
  ) {
    this.form.patchValue(data);
  }

  save(): void {
    if (this.form.invalid) return;
    this.ref.close(this.form.value);
  }
}
