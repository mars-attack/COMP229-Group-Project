import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-survey-management',
  templateUrl: './survey-management.component.html',
  styleUrls: ['./survey-management.component.css']
})
export class SurveyManagementComponent implements OnInit {
  public newSurvey: Survey;

  constructor(private repository: SurveyRepository) {}

  ngOnInit(): void {
    this.initializeNewSurvey();
    this.repository.initializeSurveys();
  }

  get surveys(): Survey[]
  {
    return this.repository.getSurveys();
  }

  onCreateSurvey(): void {
    this.repository.addSurvey(this.newSurvey);
    this.initializeNewSurvey();
    Swal.fire({
      title: 'Survey Created',
      text: 'Select your survey to add questions',
      icon: 'success'
    });
  }

  onDeleteSurvey(id: string): void {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able recover this survey.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete forever',
      cancelButtonText: 'No, I change my mind'
    }).then((result) => {
      if (result.value) {
        this.repository.deleteSurvey(id);
        Swal.fire({
          title: 'Survey deleted',
          icon: 'success'
        });
      }
    });
  }

  initializeNewSurvey(): void {
    this.newSurvey = {
      name: ''
    };
  }

}
