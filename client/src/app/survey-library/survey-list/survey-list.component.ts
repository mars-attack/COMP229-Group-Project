import { Component, OnInit } from '@angular/core';
import { Survey } from '../../model/survey.model';
import { SurveyRepository } from '../../model/survey.repository';



@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  public surveysPerPage = 4;
  public selectedPage = 1;


  constructor(private repository: SurveyRepository) { }

  ngOnInit(): void {
  }

  // returns active surveys
  get surveys(): Survey[]
  {
    // for pagination
    const pageIndex = (this.selectedPage - 1) * this.surveysPerPage;
    return this.repository.getActiveSurveys().slice(pageIndex, pageIndex + this.surveysPerPage);
  }

  changePage(newPage: number): void
  {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number): void
  {
    this.surveysPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number
  {
    return Math.ceil(this.repository
      .getSurveys().length / this.surveysPerPage);
  }
}
