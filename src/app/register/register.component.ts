import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { LoginRegisterService } from '../Services/login-register.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( public fb: FormBuilder, public loginRegisterService: LoginRegisterService, private toastr: ToastrService, private spinner: NgxSpinnerService , private router: Router) { }

  invalid:any;
  private REST_API = environment.rest_api_url;

  ngOnInit(): void {
  }

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ] ],
    password: ['', Validators.required]
  })

  get f(){
    return this.registerForm.controls;
  }

  registerSubmit() {

    if (this.registerForm.invalid) {
      this.invalid = true;
      return;
    }else{
      this.invalid = false;
    }
    this.spinner.show();

    this.loginRegisterService.candidateRegister(this.registerForm.value).subscribe( (res: any )=>{
      this.spinner.hide();
      this.registerForm.reset();
      if( res.status == 'success' ){
        this.toastr.success('Registration done!', 'Success!');
        this.router.navigate(['/login']);
      }else{
        this.toastr.error('Please try again letter!', 'Something wrong!');
      }
    })

  }

}
