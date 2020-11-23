import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Question } from 'src/app/interfaces';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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

  onCancelEdit(event: Event): void {

    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'You changes will not be saved.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, discard changes',
      cancelButtonText: 'No, keep working'
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/surveys');
      }
    });

  }

  onSurveySave(): void {
    if (this.validateDates() && this.validateQuestions()) {
      // if dates and number of questions are valid
      this.surveyRepository.updateSurvey(this.survey).subscribe(data => {
        const error = data.error;
        if (error) {
          this.flashMessage.show('Update failed, please try again.', {cssClass: 'alert-danger', timeOut: 6000});
        } else {
          this.surveyRepository.initializeSurveys();
          this.router.navigateByUrl('/surveys');
        }
      });
      this.flashMessage.show('Survey updated', {cssClass: 'alert-success', timeOut: 6000});
    }
  }

  validateDates(): boolean {
    const activeDate = new Date(this.survey.dateActive).getTime();
    const expireDate = new Date(this.survey.dateExpire).getTime();
    const currentDate = (new Date(Date.now())).getTime();

    let errorMessage;

    if (activeDate < currentDate) {
      errorMessage = 'Error: Active date cannot be earlier than current date';
    }

    if (expireDate < activeDate) {
      errorMessage = 'Error: Expiry date cannot be before date active.';
    }

    if (errorMessage) {
      this.flashMessage.show(errorMessage, {cssClass: 'alert-danger', timeOut: 6000});
    }

    return errorMessage ? false : true;
  }

  validateQuestions(): boolean {
    if (this.survey.questions.length < 1) {
      this.flashMessage.show('Error: Survey must have at least one question', {cssClass: 'alert-danger', timeOut: 6000});
      return false;
    } else {
      return true;
    }
  }
}
