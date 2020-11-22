import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './survey.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { User } from './user.model';

const PROTOCOL = 'http';
const  PORT = 3000;

export interface IResponse {
  error: string | undefined | null;
  data: any;
}

@Injectable()
export class RestDataSource
{
  user: User;
  baseUrl: string;
  authToken: string;

  private httpOptions =
  {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };



  constructor(private http: HttpClient,
              private jwtService: JwtHelperService)
  {
    this.user = new User();
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getSurveys(): Observable<IResponse>
  {
    return this.http.get<IResponse>(this.baseUrl + 'surveys');
  }

  getSurvey(id: string): Observable<IResponse>
  {
    return this.http.get<IResponse>(this.baseUrl + `surveys/${id}`);
  }

  addSurvey(survey: Survey): Observable<IResponse>
  {
    return this.http.post<IResponse>(this.baseUrl + 'surveys/add', survey);
  }

  deleteSurvey(id: string): Observable<IResponse>
  {
    return this.http.post<IResponse>(this.baseUrl + `surveys/delete/${id}`, {});
  }

  updateSurvey(survey: Survey): Observable<IResponse>
  {
    return this.http.post<IResponse>(this.baseUrl + `surveys/update/${survey._id}`, survey);
  }

  authenticate(user: User): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'login', user, this.httpOptions);
  }

  storeUserData(token: any, user: User): void
  {
    localStorage.setItem('id_token', 'Bearer' + token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(): Observable<any>
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();

    return this.http.post<any>(this.baseUrl + 'logout', this.httpOptions);
  }

  loggedIn(): boolean
  {
    return !this.jwtService.isTokenExpired(this.authToken);
  }

  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}
