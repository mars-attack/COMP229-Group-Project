import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/interfaces';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  public questions: Question[];
  public selectedQuestion: Question;
  constructor() { }

  ngOnInit(): void {
    this.questions = [
      {title: 'question 1', options: [{details: 'Option 1'}, {details: 'Option 2'}]},
      {title: 'question 2', options: []},
      {title: 'question 3', options: []},
    ];
  }

  onQuestionEdit(question: Question): void {
    this.selectedQuestion = question;
  }
}
