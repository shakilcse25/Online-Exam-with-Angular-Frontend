import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private REST_API = environment.rest_api_url;
  constructor( private httpClient: HttpClient ) { }

  unAuthHeaders = new HttpHeaders({ 'No-Auth': 'True' });
  reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  public getExams( ){
    return this.httpClient.get(this.REST_API + 'exams', { headers: this.unAuthHeaders });
  }

  public findExam( id:any ){
    return this.httpClient.get(this.REST_API + 'exam/'+id, { headers: this.unAuthHeaders });
  }

  public findExamDetails( id:any ){
    return this.httpClient.get(this.REST_API + 'exam-details/'+id, { headers: this.reqHeaders });
  }

  public storeExamInit( data ){
    return this.httpClient.post(this.REST_API + 'store-result-init', data, { headers: this.reqHeaders });
  }

  public updateAnswer( data ){
    return this.httpClient.post(this.REST_API + 'update-result', data, { headers: this.reqHeaders });
  }

  public questionValidity( examId:any, quesId: any ){
    return this.httpClient.get(this.REST_API + 'question-validity/' + examId + '/' + quesId, { headers: this.reqHeaders });
  }

  public doneExam( id:any ){
    return this.httpClient.get(this.REST_API + 'done-exam/'+id, { headers: this.reqHeaders });
  }

  public userExam(){
    return this.httpClient.get(this.REST_API + 'user-exam', { headers: this.reqHeaders });
  }

  public userResult( id:any ){
    return this.httpClient.get(this.REST_API + 'user-result/'+id, { headers: this.reqHeaders });
  }

}
