import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { Question, Option } from '../../interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})

export class TakeSurveyComponent implements OnInit {
  survey: Survey;

  constructor(
    private route: ActivatedRoute,
    private surveyRepository: SurveyRepository,
    public router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.survey = this.surveyRepository.getSurvey(id);
    if (this.survey) {
      this.survey.questions.forEach(question => {
        question.chosenOptions = ['test'];
      });
    }
  }

  // get survey(): Survey
  // {
  //   const id = this.route.snapshot.params.id;
  //   const survey = this.surveyRepository.getSurvey(id);
  //   if (survey) {
  //     survey.questions.forEach(question => {
  //       question.chosenOptions = ['test'];
  //     });
  //   }
  //   return survey;
  // }

  onSurveySave(event: Event): void {
    event.preventDefault();
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

    this.surveyRepository.updateSurvey(this.survey).subscribe(data => {
      const error = data.error;

      if (error) {
        // TODO: enhancement - show error in ui
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

    console.log('after select', question.chosenOptions);
  }

  checkIfSelected(question: Question, optionId: string): boolean {
    if (question && question.chosenOptions && optionId) {
      console.log(this.survey.questions);
      const condition = question.chosenOptions.indexOf(optionId) > -1;
      console.log(question, optionId, condition);
      return condition;
    }
  }
}
