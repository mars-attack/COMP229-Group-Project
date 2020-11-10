import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { CounterDirective } from './counter.directive';
import { SurveyLibraryComponent } from '../survey-library/survey-library.component';


@NgModule({
  imports: [
    ModelModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [
    SurveyLibraryComponent,
    CounterDirective
  ],
  exports: [
    SurveyLibraryComponent,
    CounterDirective
  ]
})
export class SurveyLibraryModule {}
