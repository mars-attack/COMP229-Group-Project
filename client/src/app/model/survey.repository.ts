import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { IResponse, RestDataSource } from './rest.datasouce';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable()
export class SurveyRepository
{
  private surveys: Survey[] = [];

  constructor(
    private restDataSource: RestDataSource,
    private flashMessage: FlashMessagesService)
  {
    this.initializeSurveys();
  }

  getActiveSurveys(): Survey[]
  {
    return this.surveys.filter((survey) => this.isActive(survey));
  }

  getSurveys(): Survey[]
  {
    return this.surveys;
  }

  getSurvey(id: string): Survey
  {
    return this.surveys.find(s => id === s._id);
  }

  addSurvey(survey: Survey): void
  {
    this.restDataSource.addSurvey(survey).subscribe(data => {
      const addedSurvey = data.data as Survey;
      const error = data.error;

      if (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to create survey, please try again.',
          icon: 'error'
        });
         // this.flashMessage.show('Error: failed to create survey, please try again.', {cssClass: 'alert-danger', timeOut: 6000});
      } else if (addedSurvey) {
        this.initializeSurveys(); // reload surveys
        // this.router.navigateByUrl('/surveys/edit/' + addedSurvey._id);
      }
    });
  }

  deleteSurvey(id: string): void
  {
    this.restDataSource.deleteSurvey(id).subscribe(data => {
      const error = data.error;

      if (error) {

        Swal.fire({
          title: 'Error',
          text: 'Failed to delete survey, please try again.',
          icon: 'error'
        });
       // this.flashMessage.show('Error: failed to delete survey, please try again.', {cssClass: 'alert-danger', timeOut: 6000});
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
    this.restDataSource.getSurveys().subscribe(data => { this.surveys = data.data; });

    // this.restDataSource.getSurveys().subscribe(data => {
    //   // sort by dateCreated desc
    //   const survey = data.data.slice().sort((a, b) => {
    //     return (new Date(b.dateCreated) as any) - ( new Date(a.dateCreated) as any);
    //   });
    //   this.surveys = survey;
    // });
  }

  isActive(survey: Survey): boolean {

    const activeDate = new Date(survey.dateActive).getTime();
    const expireDate = new Date(survey.dateExpire).getTime();

    if (activeDate <= Date.now() &&  Date.now() <= expireDate)
    {
      return true;
    } else {
      return false;
    }
  }

}
