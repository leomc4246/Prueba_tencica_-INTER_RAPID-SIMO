import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../src/environments/environment';
import { Subject } from '../models/subject.model';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private api = environment.api;

  constructor(private http: HttpClient) {}


getSubjects(): Observable<Subject[]> {       
  return this.list();
}

list(): Observable<Subject[]> {
  return this.http.get<Subject[]>(`${environment.api}/subjects`);
}

}
