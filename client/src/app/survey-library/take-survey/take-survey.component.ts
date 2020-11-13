import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { Question, Option } from '../../interfaces';


@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})

export class TakeSurveyComponent implements OnInit, AfterViewInit {
  // public questions: Question[];
  constructor(
    private route: ActivatedRoute,
    private surveyRepository: SurveyRepository
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
  //   console.log('refresh');
  //   const id = this.route.snapshot.params.id;
  //   this.questions = this.surveyRepository.getSurvey(id).questions;
  }

  get survey(): Survey
  {
    const id = this.route.snapshot.params.id;
    const survey = this.surveyRepository.getSurvey(id);
    survey.questions.forEach(question => question.choosenOption = undefined); // populate the choosenOption to be undefined.
    return survey;
  }

  onSurveySave(): void {
    console.log(this.survey);
    // this.surveyRepository.updateSurvey(this.survey);
  }

}
