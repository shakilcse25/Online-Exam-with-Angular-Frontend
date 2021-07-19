import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  private REST_API = environment.rest_api_url;
  constructor( private httpClient: HttpClient ) { }

  unAuthHeaders = new HttpHeaders({ 'No-Auth': 'True' });
  reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  public candidateRegister( data: any ){
    return this.httpClient.post(this.REST_API + 'register-candidate',data, { headers: this.unAuthHeaders });
  }

  public candidateLogin( data: any ){
    return this.httpClient.post(this.REST_API + 'login-candidate',data, { headers: this.unAuthHeaders });
  }

  public getUser( ){
    return this.httpClient.get(this.REST_API + 'user',{ headers: this.reqHeaders });
  }

}
