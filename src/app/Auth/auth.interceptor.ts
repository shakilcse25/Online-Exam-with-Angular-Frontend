import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { AuthService } from "../Services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private authservice: AuthService , private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if( req.headers.get('No-Auth') === 'True' ) {
      return next.handle(req.clone());
    }
    const token = this.authservice.getToken();

    req = this.addToken(req, token);

    return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse) => {
                if(err.status === 401) {
                    localStorage.removeItem('token');
                    this.router.navigate(['/login']);
                } else if(err.status === 403) {
                    this.router.navigate(['/forbidden']);
                }
                return throwError("You must be authenticated!");
            }
        )
    );
  }

  private addToken(request:HttpRequest<any>, token:string) {
      return request.clone(
          {
              setHeaders: {
                  Authorization : `Bearer ${token}`
              }
          }
      );
  }

}
