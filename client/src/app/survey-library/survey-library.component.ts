import { Component, OnInit } from '@angular/core';
import { Survey } from '../model/survey.model';
import { SurveyRepository } from '../model/survey.repository';


@Component({
  selector: 'app-survey-library',
  templateUrl: './survey-library.component.html',
  styleUrls: ['./survey-library.component.css']
})
export class SurveyLibraryComponent implements OnInit {

  public surveysPerPage = 4;
  public selctedPage = 1;

  constructor(private repository: SurveyRepository) { }

  ngOnInit(): void {
  }


  get surveys(): Survey[]
  {
    // for pagination
    const pageIndex = (this.selctedPage - 1) * this.surveysPerPage;
    return this.repository.getSurveys().slice(pageIndex, pageIndex + this.surveysPerPage);
  }

  changePage(newPage: number): void
  {
    this.selctedPage = newPage;
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
