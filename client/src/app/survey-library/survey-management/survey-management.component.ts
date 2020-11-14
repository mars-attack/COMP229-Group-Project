import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

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
  }

  get surveys(): Survey[]
  {
    return this.repository.getSurveys();
  }

  onCreateSurvey(): void {
    this.repository.addSurvey(this.newSurvey);
    this.initializeNewSurvey();
  }

  onDeleteSurvey(id: string): void {
    this.repository.deleteSurvey(id);
  }

  initializeNewSurvey(): void {
    this.newSurvey = {
      name: ''
    };
  }

}
