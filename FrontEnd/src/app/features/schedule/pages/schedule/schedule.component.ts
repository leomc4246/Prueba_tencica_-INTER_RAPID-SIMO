import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../core/services/student.service';
import { ScheduleItem } from '../../../../core/models/schedule-item.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  schedule: ScheduleItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    
    const studentId = +this.route.snapshot.paramMap.get('id')!;

    this.studentService.schedule(studentId)
      .subscribe((items: ScheduleItem[]) => this.schedule = items);
  }
}
