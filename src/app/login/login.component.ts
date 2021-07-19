import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { LoginRegisterService } from '../Services/login-register.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public fb: FormBuilder, public loginRegisterService: LoginRegisterService, private authservice: AuthService, private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
  }

  invalid:any;
  private REST_API = environment.rest_api_url;

  loginForm = this.fb.group({
    email: ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ] ],
    password: ['', Validators.required]
  })

  get f(){
    return this.loginForm.controls;
  }

  loginSubmit() {
    if (this.loginForm.invalid) {
      this.invalid = true;
      return;
    }else{
      this.invalid = false;
    }
    this.spinner.show();

    this.loginRegisterService.candidateLogin(this.loginForm.value).subscribe( (res: any )=>{
      this.spinner.hide();
      this.loginForm.reset();
      if( res.status == 'success' ){
        this.authservice.setToken(res.token);
        this.toastr.success('Login Success!', 'Success!');
        this.router.navigate(['/profile']);
      }else if( res.status == 'invalid' ){
        this.toastr.error('Invalid creadentials!', 'Unauthenticated!');
      }
      else{
        this.toastr.error('Please try again letter!', 'Something wrong!');
      }
    })

  }

}
