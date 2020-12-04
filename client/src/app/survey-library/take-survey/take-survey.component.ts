import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { Question, Option } from '../../interfaces';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})

export class TakeSurveyComponent implements OnInit, AfterViewInit {
  // survey: Survey;
  // TODO: include overlay in html
  showCannotTakeOverlay: boolean;

  constructor(
    private route: ActivatedRoute,
    private surveyRepository: SurveyRepository,
    public router: Router,
  ) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.params.id;
    // this.survey = this.surveyRepository.getSurvey(id);

    if (this.survey) {
      this.survey.questions.forEach(question => {
        question.chosenOptions = ['test'];
      });
    }
  }

  get survey(): Survey {
    const id = this.route.snapshot.params.id;
    return this.surveyRepository.getSurvey(id);
  }

  // reroute if survey is inactive
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.survey && !this.surveyRepository.isActive(this.survey)){
        // this.router.navigateByUrl('/');
        this.showCannotTakeOverlay = true;
      }
    }, 250);
  }

  onCancelSubmit(event: Event): void {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your answers will not be saved.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I\'m sure',
      cancelButtonText: 'No, keep working'
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/');
      }
    });
  }

  onConfirmSubmit(event: Event): void {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able change your answers.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit!',
      cancelButtonText: 'No, keep working'
    }).then((result) => {
      if (result.value) {
        this.surveySave();
        Swal.fire({
          title: 'Submitted!',
          text: 'Thank you for completing this survey :)',
          icon: 'success'
        });
      }
    });
  }

  surveySave(): void {
    this.survey.responses++;

    // checking the selected option and updating the options count
    for (let index = 0; index <=  this.survey.questions.length - 1; index++)
    {
      const question = this.survey.questions[index];
      const options = this.survey.questions[index].options;
      const chosenOptions = this.survey.questions[index].chosenOptions;

      for (let j = 0; j <= options.length - 1; j++)
      {
        for (let m = 0; m <= chosenOptions.length - 1; m++)
        {
          if (question.chosenOptions[m] === question.options[j]._id)
          {
            question.options[j].count++;
          }
        }
      }

      question.chosenOptions = undefined; // reset chosen option
    }

    this.surveyRepository.takeSurvey(this.survey).subscribe(data => {
      const error = data.error;

      if (error) {
        Swal.fire({
          title: 'Oh no! :(',
          text: 'Something bad happened, please try again',
          icon: 'error'
        });
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }


  onSelectOption(question: Question, optionId: string): void {

    // initializing array
    if (!question.chosenOptions) {
      question.chosenOptions = [];
    }

    if (question.optionType === 'radio')  {
      question.chosenOptions[0] = optionId;
    } else if (question.optionType === 'checkbox') {
      if (!question.chosenOptions.includes(optionId)) // if first selection
      {
        question.chosenOptions.push(optionId); // remove
      } else {
        question.chosenOptions.splice(question.chosenOptions.indexOf(optionId), 1);
      }
    }
  }

  checkIfSelected(question: Question, optionId: string): boolean {
    if (question && question.chosenOptions && optionId) {
      const condition = question.chosenOptions.indexOf(optionId) > -1; // checks if the option is in the array
      return condition;
    }
  }
}
