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

  getSurvey(id: string): Survey
  {
    console.log(id);
    console.log(this.surveys);
    console.log(this.surveys.find(s => id == s._id));
    return this.surveys.find(s => id == s._id);
  }

  addSurvey(survey: Survey): void
  {
    this.surveys.push(survey);
  }

  deleteSurvey(id: string): void
  {
    const foundIndex = this.surveys.findIndex(s => id === s._id);
    this.surveys.splice(foundIndex, 1);
  }

}
