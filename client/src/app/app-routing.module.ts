import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DisplayResultsComponent } from './survey-library/display-results/display-results.component';
import { EditSurveyComponent } from './survey-library/edit-survey/edit-survey.component';
import { SurveyManagementComponent } from './survey-library/survey-management/survey-management.component';
import { TakeSurveyComponent } from './survey-library/take-survey/take-survey.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'surveys', component: SurveyManagementComponent, data: {title: 'Surveys'}},
  {path: 'surveys/edit/:id', component: EditSurveyComponent, data: {title: 'Edit Survey'}},
  {path: 'surveys/take/:id', component: TakeSurveyComponent, data: {title: 'Take Survey'}},
  {path: 'surveys/results/:id', component: DisplayResultsComponent, data: {title: 'Results'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
