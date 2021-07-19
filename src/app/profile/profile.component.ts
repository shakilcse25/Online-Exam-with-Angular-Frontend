import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../Services/auth.service';
import { ExamService } from '../Services/exam.service';
import { LoginRegisterService } from '../Services/login-register.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private spinner: NgxSpinnerService, public exam_service: ExamService, public loginRegisterService: LoginRegisterService,public authService: AuthService) { }

  result: any;
  user: any;

  ngOnInit(): void {
    this.userExam();
    if( this.authService.isLoggedIn() ){
      this.loginRegisterService.getUser().subscribe( (res: any )=>{
        this.user = res.data;
      })
    }
  }

  userExam() {
    this.spinner.show();
    this.exam_service.userExam().subscribe( ( res: any )=>{
      this.spinner.hide();
      this.result = res.exam;
    } , (err: any) =>{
      console.log(err);
      this.spinner.hide();
    });
  }

}
