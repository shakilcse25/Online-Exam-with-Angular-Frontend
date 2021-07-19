import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExamService } from '../Services/exam.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css']
})
export class ExamDetailsComponent implements OnInit {

  exam: any;
  firstQuest :any;
  perQuestion :boolean;
  public BACKEND_URL = environment.backend_url;

  constructor(public exam_service: ExamService, private active_route: ActivatedRoute, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {

    const routeParams = this.active_route.snapshot.paramMap;
    const examId = Number(routeParams.get('id'));

    this.findExam(examId);
  }

  findExam( id: any ): void {
    this.spinner.show();
    this.exam_service.findExam(id).subscribe( ( res: any )=>{
      this.exam = res.data;

      this.perQuestion = ( this.exam.perDuration == null ) ? false : true;

      this.firstQuest = res.firstQues;
      this.spinner.hide();
    });
  }

}
