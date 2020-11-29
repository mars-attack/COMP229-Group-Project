import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/interfaces';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-display-results',
  templateUrl: './display-results.component.html',
  styleUrls: ['./display-results.component.css']
})
export class DisplayResultsComponent implements OnInit {

  survey: Survey;
  questions: Question[];

  // for exporting to excel document
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  title = 'Excel';
  ExportTOExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.survey.name + '.xlsx');
  }


  constructor(
    private surveyRepository: SurveyRepository,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.survey = this.surveyRepository.getSurvey(id);
    this.questions = this.survey.questions;
  }

  onConfirmReset(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able recover these statistics.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I\'m sure',
      cancelButtonText: 'No, keep them'
    }).then((result) => {
      if (result.value) {
        this.resultsReset();
        Swal.fire({
          title: 'Survey results reset!',
          icon: 'success'
        });
      }
    });
  }

  resultsReset(): void {
    this.survey.responses = 0;
    for (let i = 0; i <= this.questions.length - 1 ; i++)
    {
      const options = this.questions[i].options;
      for (let j = 0; j <= options.length - 1; j ++) {
        options[j].count = 0;
      }
    }
    console.log(this.survey);

    this.surveyRepository.updateSurvey(this.survey).subscribe(data => {
      const error = data.error;
      if (error) {
        Swal.fire({
          title: 'Oh no! :(',
          text: 'Something bad happened, please try again',
          icon: 'error'
        });
      }
    });
  }
}
