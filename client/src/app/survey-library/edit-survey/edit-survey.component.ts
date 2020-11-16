import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Question } from 'src/app/interfaces';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {
  public selectedQuestion: Question;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private surveyRepository: SurveyRepository,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
  }

  get survey(): Survey {
    const id = this.route.snapshot.params.id;
    return this.surveyRepository.getSurvey(id);
  }

  onQuestionEdit(question: Question): void {
    this.selectedQuestion = question;
  }

  onQuestionSave(question: Question): void {
    // check if edit or add
    if (this.selectedQuestion) {
      this.selectedQuestion = question;
    } else {
      this.survey.questions.push(question);
    }
    this.selectedQuestion = undefined;
  }

  onSurveySave(): void {
    const activeDate = new Date(this.survey.dateActive).getTime();
    const expireDate = new Date(this.survey.dateExpire).getTime();
    const dateNow = (new Date(Date.now())).getTime();

    if (activeDate < dateNow) {
      this.survey.dateActive = new Date().toISOString().substring(0, 10); // yyyy-mm-dd format
    }

    if (expireDate > activeDate)
    {
      console.log('valid');
      this.surveyRepository.updateSurvey(this.survey).subscribe(data => {
        const error = data.error;
        if (error) {
          // TODO: enhancement - show error in ui
        } else {
          this.surveyRepository.initializeSurveys();
          this.router.navigateByUrl('/surveys');
        }
      });
    } else {
      // TODO: Error message
      console.log('invalid');
      this.flashMessage.show('Invalid date entered', {cssClass: 'alert-success', timeOut: 6000});
    }
  }
}
