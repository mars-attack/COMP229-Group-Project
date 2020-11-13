import { NgModule } from '@angular/core';
import { SurveyRepository } from './survey.repository';
import { HttpClientModule } from '@angular/common/http';
import { RestDataSource } from './rest.datasouce';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    SurveyRepository,
    RestDataSource
  ]
})
export class ModelModule
{

}
