import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { Observable, from } from 'rxjs';

@Injectable()
export class StaticDataSource
{
  private surveys: Survey[] =
  [
  ];

  getSurveys(): Observable<Survey[]>
  {
    return from([this.surveys]);
  }
}
