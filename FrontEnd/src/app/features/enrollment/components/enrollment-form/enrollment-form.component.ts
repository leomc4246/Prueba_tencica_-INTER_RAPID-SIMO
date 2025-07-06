import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../../../core/services/subject.service';
import { StudentService } from '../../../../core/services/student.service';
import { Subject } from '../../../../core/models/subject.model';
import { Student } from '../../../../core/models/student.model';
import { inject } from '@angular/core';
@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss']
})
export class EnrollmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  form!: FormGroup;
  subjects: Subject[] = [];
  students: Student[] = [];

  constructor(
    //private fb: FormBuilder,
    private subjectSvc: SubjectService,
    private studentSvc: StudentService
  ) {}

  ngOnInit(): void {
    /* Construir formulario */
    this.form = this.fb.group({
      studentId : [null, Validators.required],
      subjectIds: [[],  [Validators.required, Validators.maxLength(3)]]
    });

    /* Cargar catálogos */
    this.subjectSvc.list().subscribe((subs: Subject[]) => (this.subjects = subs));
    this.studentSvc.list().subscribe((sts: Student[])   => (this.students = sts));
  }

  /* Enviar matrícula */
  submit(): void {
    if (this.form.invalid) return;

    const { studentId, subjectIds } = this.form.value as {
      studentId: number;
      subjectIds: number[];
    };

    /* Regla 1: exactamente 3 materias */
    if (subjectIds.length !== 3) {
      alert('Debes seleccionar exactamente 3 materias.');
      return;
    }

    /* Regla 2: profesores distintos */
    const professors = this.subjects
      .filter(s => subjectIds.includes(s.id))
      .map(s => s.professor);

    if (new Set(professors).size !== 3) {
      alert('No puedes repetir profesor.');
      return;
    }

    
    this.studentSvc.enroll(studentId, subjectIds).subscribe({
      next: () => {
        alert('Matrícula exitosa');
        this.form.reset();
      },
      error: err => alert(err.error ?? 'Error al matricular')
    });
  }
}
