import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../core/services/student.service';
import { Student } from '../../../../core/models/student.model';
import { ScheduleItem } from '../../../../core/models/schedule-item.model';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  student!: Student;
  schedule: ScheduleItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.studentService.getStudentById(id).subscribe(data => this.student = data);
    this.studentService.getSchedule(id).subscribe(data => this.schedule = data);
  }
}
