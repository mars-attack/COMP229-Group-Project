import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/interfaces';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-display-results',
  templateUrl: './display-results.component.html',
  styleUrls: ['./display-results.component.css']
})
export class DisplayResultsComponent implements OnInit {

  constructor(
    private surveyRepository: SurveyRepository,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  get survey(): Survey
  {
    const id = this.route.snapshot.params.id;
    return this.surveyRepository.getSurvey(id);
  }

  get questions(): Question[]
  {
    const id = this.route.snapshot.params.id;
    return this.surveyRepository.getSurvey(id).questions;
  }
}
