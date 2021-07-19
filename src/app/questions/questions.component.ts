import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuestionPipe } from '../Pipes/question.pipe';
import { ExamService } from '../Services/exam.service';
import { FormBuilder } from "@angular/forms";
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  exam: any;
  questions: any;
  question: any;
  options: any;
  rightAnswer: any;
  nextId: any;
  questionId: any;
  examId: any;
  pertime: any;
  leftTime: number = 0;
  interval: any;
  i:number = 1;
  promise: any;

  constructor( public fb: FormBuilder, public exam_service: ExamService, private question_pipe: QuestionPipe, private active_route: ActivatedRoute, private spinner: NgxSpinnerService, private router: Router) { }


  answerForm = this.fb.group({
    answer: [''],
  })

  get f(){
    return this.answerForm.controls;
  }

  ngOnInit(): void {
    // let i = 1;
    this.active_route.params.subscribe(async routeParams => {
      this.examId = Number(routeParams.examId);
      this.questionId = Number(routeParams.questionId);
      this.checkQuestionValidity();
    });
  }

  checkQuestionValidity() {
    this.exam_service.questionValidity(this.examId, this.questionId).subscribe( ( res: any )=>{
      console.log(res);
      if( Number.isInteger(res.quesId) ) {
        this.router.navigate(['/questions/' + this.examId + '/' + res.quesId ])
      }else if( res.quesId == 'end' ) {
        console.log('end');
        this.router.navigate(['profile/result/'+this.examId ]);
      }else if( res.quesId == 'store') {
        this.setExamQuestions();
      }else{
        if( this.i ) {
          this.findExamDetails();
          this.i = 0;
        }else {
          this.setAllvalue();
        }
      }

    } , (err: any) =>{
      console.log(err);
      this.spinner.hide();
    } );
  }

  setExamQuestions() {
    this.spinner.show();
    this.exam_service.findExamDetails(this.examId).subscribe( ( res: any )=>{
      this.exam = res.exam;
      this.questions = this.exam?.questions;
      let data = { 'questions' : this.questions,'myexam_id' : this.exam.id };
      this.exam_service.storeExamInit(data).subscribe( ( res: any )=>{
        this.setAllvalue();
        this.i = 0;
        this.spinner.hide();
      } , (err: any) =>{
        console.log(err);
        this.spinner.hide();
      });
    } , (err: any) =>{
      console.log(err);
      this.spinner.hide();
    });
  }

  findExamDetails(): void {
    this.spinner.show();
    this.exam_service.findExamDetails(this.examId).subscribe( ( res: any )=>{
      this.exam = res.exam;
      this.setAllvalue();
      this.spinner.hide();
    } , (err: any) =>{
      console.log(err);
      this.spinner.hide();
    } );
  }

  setAllvalue() {
    console.log('setAllvalue');
    this.questions = this.exam?.questions;
    this.question = this.question_pipe.transform(this.questions, this.questionId, false);
    this.nextId = this.question_pipe.transform(this.questions, this.questionId, true);
    this.options = JSON.parse( this.question?.options?.options_name )?.options;
    this.rightAnswer = JSON.parse( this.question?.options?.right_option )?.answer;
    let fullDuration = (this.exam.fullDuration != null) ? this.exam.fullDuration : '00:30:00' ;
    var a = fullDuration.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    this.pertime = Number (  sessionStorage.getItem('leftTime') ? sessionStorage.getItem('leftTime') : seconds );
    this.perQuestionTime();
  }

  perQuestionTime() {
    this.leftTime = Number (  sessionStorage.getItem('leftTime') ? sessionStorage.getItem('leftTime') : this.pertime );
    this.interval = setInterval(() => {
      let time = String( this.leftTime-1 );
      sessionStorage.setItem('leftTime', time);
      this.leftTime = Number ( sessionStorage.getItem('leftTime') );
      if( this.leftTime < 0 ){
        sessionStorage.removeItem('leftTime');
        clearInterval(this.interval);
        this.router.navigate(['profile/result/'+this.examId ]);
      }
    }, 1000);
  }

  updateAnswerSheet() {
    this.spinner.show();
    this.answerForm.value['quesId'] = this.questionId;
    this.answerForm.value['examId'] = this.examId;
    this.answerForm.value['isAnswer'] = 1;
    this.answerForm.value['nextId'] = this.nextId;
    this.answerForm.value['isRight'] = (this.rightAnswer.indexOf(this.answerForm.value['answer']) !== -1) ? 1 : 0;
    this.exam_service.updateAnswer( this.answerForm.value).subscribe( ( res: any )=>{
      this.spinner.hide();
      console.log(res);
      if( this.nextId != -1 ) {
        this.router.navigate(['/questions/' + this.examId + '/' + this.nextId ]);
      }else{
        this.router.navigate(['profile/result/' + this.examId ]);
      }
    } , (err: any) =>{
      console.log(err);
      this.spinner.hide();
    } );
  }

  ngOnDestroy() : void {
    sessionStorage.removeItem('leftTime');
    clearInterval(this.interval);
    this.exam_service.doneExam( this.examId ).subscribe( ( res: any )=>{
      console.log(res);
    } , (err: any) =>{
      console.log(err);
    } );
  }

}
