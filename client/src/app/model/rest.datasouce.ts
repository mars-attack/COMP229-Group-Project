import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './survey.model';


const PROTOCOL = 'http';
const  PORT = 3000;

export interface IResponse {
  error: string | undefined | null;
  data: any;
}

@Injectable()
export class RestDataSource
{
  baseUrl: string;
  constructor(private http: HttpClient)
  {
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
}
