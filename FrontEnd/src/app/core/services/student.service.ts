import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../src/environments/environment';   
import { Student } from '../models/student.model';
import { ScheduleItem } from '../models/schedule-item.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly api = environment.api;                  

  constructor(private http: HttpClient) {}

  /* ──────────────── CRUD ──────────────── */

  list(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.api}/students`);
  }

  get(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.api}/students/${id}`);
  }

  add(student: Partial<Student>): Observable<Student> {
    return this.http.post<Student>(`${this.api}/students`, student);
  }

  update(id: number, student: Partial<Student>): Observable<void> {
    return this.http.put<void>(`${this.api}/students/${id}`, student);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/students/${id}`);
  }

  /* ─────── Matrícula y horario ─────── */

  enroll(id: number, subjectIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.api}/students/${id}/enroll`, subjectIds);
  }

  schedule(id: number): Observable<ScheduleItem[]> {
    return this.http.get<ScheduleItem[]>(`${this.api}/students/${id}/schedule`);
  }

  getAllStudents = this.list;
  getStudentById = this.get;

  getSchedule(id: number): Observable<ScheduleItem[]> {
  return this.http.get<ScheduleItem[]>(`${this.api}/students/${id}/schedule`);
}
}
