import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from '../Services/exam.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  result: any;
  examQues: any;
  rightAns:number = 0;
  wrongAns:number = 0;
  totalMarks: number = 0;
  achievedMarks: number = 0;
  resultId: any;
  questions: any;

  constructor(private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router,private active_route: ActivatedRoute, public exam_service: ExamService) { }

  ngOnInit(): void {
    this.active_route.params.subscribe(async routeParams => {
      this.resultId = Number(routeParams.id);
    });
    this.userResult();
  }

  userResult() {
    this.spinner.show();
    this.exam_service.userResult(this.resultId).subscribe( ( res: any )=>{
      this.spinner.hide();
      this.result = res.result;
      this.examQues = res.examQues;
      this.questions = this.examQues?.questions;
      let answersheet = JSON.parse( this.result?.answer_sheet );

      answersheet.forEach(( ques ) => {
        if( ques.isRight == 1 ){
          this.rightAns++;
        }else{
          this.wrongAns++;
        }
        this.checkQustion(ques.isRight, ques.ques_id);
      } )
    } , (err: any) =>{
      console.log(err);
      this.spinner.hide();
    });
  }

  checkQustion( isRight: boolean, ques_id: number) {
    this.questions.forEach( ( question ) => {
      if( question.id == ques_id ) {
        this.totalMarks += question.marks;
        if( isRight ) {
          this.achievedMarks += question.marks;
        }else{
          this.achievedMarks -= (question.marks) * (this.examQues.negative/100);
        }
      }
    } )
  }

}
