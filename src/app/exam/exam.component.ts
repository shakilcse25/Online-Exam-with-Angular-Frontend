import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExamService } from '../Services/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  exams: any;

  constructor(public exam_service: ExamService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.getExam();
  }

  getExam(): void {
    this.spinner.show();
    this.exam_service.getExams().subscribe( (res: any )=>{
      this.exams = res.data;
      this.spinner.hide();
    });
  }

}
