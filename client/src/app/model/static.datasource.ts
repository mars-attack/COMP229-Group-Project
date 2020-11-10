import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { Observable, from } from 'rxjs';

@Injectable()
export class StaticDataSource
{
  private surveys: Survey[] =
  [
    new Survey(1, 'Survey 1', '01/01/20', 1),
    new Survey(2, 'Survey 2', '01/01/20', 11),
    new Survey(3, 'Survey 3', '01/01/20', 19),
    new Survey(4, 'Survey 4', '01/01/20', 7)

  ];

  getSurveys(): Observable<Survey[]>
  {
    return from([this.surveys]);
  }
}
