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

  constructor(
    private route: ActivatedRoute,
    private surveyRepository: SurveyRepository,
    public router: Router
  ) { }

  ngOnInit(): void {}

  get survey(): Survey
  {
    const id = this.route.snapshot.params.id;
    const survey = this.surveyRepository.getSurvey(id);
    console.log(survey);
    return survey;
  }

  onSurveySave(event: Event): void {
    event.preventDefault();
    console.log(this.survey);
    this.survey.responses++;


    // checking the selected option and updating the options count
    for (let index = 0; index <=  this.survey.questions.length - 1; index++)
    {
      const question = this.survey.questions[index];
      const options = this.survey.questions[index].options;

      for (let j = 0; j <= options.length - 1; j++)
      {
        if (question.chosenOption === question.options[j]._id)
        {
          // console.log(question.options[j].count);
          question.options[j].count++;
        }
      }

      question.chosenOption = undefined; // reset chosen option
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

  onSelectOption(questionIndex: number, optionId: string): void {
    const foundQuestion = this.survey.questions[questionIndex];
    foundQuestion.chosenOption = optionId;
    console.log(foundQuestion);
  }

}
