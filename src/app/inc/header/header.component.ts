import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../Services/auth.service';
import { LoginRegisterService } from '../../Services/login-register.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginRegisterService: LoginRegisterService, public authService: AuthService , public router: Router) { }

  user: any;

  public BACKEND_URL = environment.backend_url;

  ngOnInit(): void {
    if( this.authService.isLoggedIn() ){
      this.loginRegisterService.getUser().subscribe( (res: any )=>{
        this.user = res.data;
      })
    }
  }

  doLogout() {
    let removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

}
