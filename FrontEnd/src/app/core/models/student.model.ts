import { Subject } from './subject.model';
export interface Student {
  id: number;
  fullName: string;
  email: string;
  enrolledSubjects?: Subject[];   
}
