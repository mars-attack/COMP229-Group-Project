import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Question } from 'src/app/interfaces';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit, OnChanges {
  @Input() question: Question;
  public placeholderQuestion: Question;
  constructor() { }

  ngOnInit(): void {
    this.initializePlaceholderQuestion();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.question) {
      this.placeholderQuestion = this.question;
    }
  }

  onAddOption(): void {
    this.placeholderQuestion.options.push({
      details: ''
    });
  }

  onDelete(index: number): void {
    if (this.placeholderQuestion.options.length > 1)
    {
      this.placeholderQuestion.options.splice(index, 1);
    }
  }

  // save edits
  onSave(): void {
    // TODO: do api to update
    console.log(this.placeholderQuestion);

    // reset form input
    this.question = undefined;
    this.initializePlaceholderQuestion();
  }

  initializePlaceholderQuestion(): void {
    this.placeholderQuestion = {
      title: '',
      options: [{
        details: ''
      }]
    };
  }
}
