import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { StaticDataSource } from './static.datasource';

@Injectable()
export class SurveyRepository
{
  private surveys: Survey[] = [];

  constructor(private dataSource: StaticDataSource)
  {
    dataSource.getSurveys().subscribe(data => {
      this.surveys = data;
    });
  }

  getSurveys(): Survey[]
  {
    return this.surveys;
  }

  getSurvey(id: number): Survey
  {
    return this.surveys.find(s => id === s._id);
  }

}
