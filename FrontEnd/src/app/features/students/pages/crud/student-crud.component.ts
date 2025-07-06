import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { StudentService } from '../../../../core/services/student.service';
import { Student } from '../../../../core/models/student.model';
import { StudentDialogComponent } from '../../components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-student-crud',
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.scss']
})
export class StudentCrudComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'email', 'actions'];

  students: Student[] = [];
  loading = false;

  constructor(
    private api: StudentService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.fetch();
  }


  trackById(_: number, item: Student): number {
    return item.id;
  }


  openModal(student?: Student): void {
    const ref = this.dialog.open(StudentDialogComponent, {
      width: '420px',
      data: student ? { ...student } : { fullName: '', email: '' }
    });

    ref.afterClosed().subscribe(res => {
      if (!res) return; 
      this.loading = true;

     
      const op$: Observable<unknown> = res.id
        ? this.api.update(res.id, res)
        : this.api.add(res);

      op$
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: () => {
            this.fetch();
            this.snack.open(
              res.id ? 'Estudiante actualizado' : 'Estudiante creado',
              'OK',
              { duration: 2500 }
            );
          },
          error: () => this.snack.open('Error al guardar', 'OK', { duration: 2500 })
        });
    });
  }

  inlineUpdate(st: Student, name: string): void {
    const newName = name.trim();
    if (!newName || newName === st.fullName) return;

    this.api.update(st.id, { fullName: newName }).subscribe({
      next: () => this.snack.open('Nombre actualizado', 'OK', { duration: 2000 }),
      error: () => this.snack.open('Error al actualizar', 'OK', { duration: 2500 })
    });
  }

  delete(id: number): void {
    this.api.remove(id).subscribe({
      next: () => {
        this.students = this.students.filter(s => s.id !== id);
        this.snack.open('Estudiante eliminado', 'OK', { duration: 2500 });
      },
      error: () => this.snack.open('Error al eliminar', 'OK', { duration: 2500 })
    });
  }

  private fetch(): void {
    this.loading = true;
    this.api
      .list()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(data => (this.students = data));
  }
}
