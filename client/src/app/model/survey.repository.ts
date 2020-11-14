import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { IResponse, RestDataSource } from './rest.datasouce';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class SurveyRepository
{
  private surveys: Survey[] = [];

  constructor(private restDataSource: RestDataSource, private router: Router)
  {
    this.initializeSurveys();
  }

  getSurveys(): Survey[]
  {
    return this.surveys;
  }

  getSurvey(id: string): Survey
  {
    return this.surveys.find(s => id == s._id);
    // this.restDataSource.addSurvey(survey)
  }

  addSurvey(survey: Survey): void
  {
    this.restDataSource.addSurvey(survey).subscribe(data => {
      const addedSurvey = data.data as Survey;
      const error = data.error;

      if (error) {
        // TODO: enhancement - show error in ui
      } else if (addedSurvey) {
        // TODO: enhancement - show success toast

        this.initializeSurveys(); // reload surveys
      }
    });
  }

  deleteSurvey(id: string): void
  {
    this.restDataSource.deleteSurvey(id).subscribe(data => {
      const error = data.error;

      if (error) {
        // TODO: enhancement - show error in ui
      } else {
        this.initializeSurveys(); // reload surveys
      }
    });
  }

  updateSurvey(survey: Survey): Observable<IResponse>
  {
    return this.restDataSource.updateSurvey(survey);
  }

  initializeSurveys(): void {
    this.restDataSource.getSurveys().subscribe(data => {
      // sort by dateCreated desc
      const survey = data.data.slice().sort((a, b) => {
        return (new Date(b.dateCreated) as any) - ( new Date(a.dateCreated) as any);
      });
      this.surveys = survey;
    });
  }

}
