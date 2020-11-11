import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { CounterDirective } from './counter.directive';
import { SurveyLibraryComponent } from '../survey-library/survey-library.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';


@NgModule({
  imports: [
    ModelModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [
    SurveyLibraryComponent,
    CounterDirective,
    QuestionsComponent,
    QuestionFormComponent,
    CreateSurveyComponent
  ],
  exports: [
    SurveyLibraryComponent,
    CounterDirective,
  ]
})
export class SurveyLibraryModule {}
