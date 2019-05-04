import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {StudentService} from '../../../services/student.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-report-checker',
  templateUrl: './report-checker.component.html',
  styleUrls: ['./report-checker.component.css']
})
export class ReportCheckerComponent implements OnInit {

  studentCheckForm: FormGroup;
  reports = [];
  shouldSelectBeVisible = true;
  shouldBeDisplayed = false;
  actualReportId: number;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService) {
  }

  get f() {
    return this.studentCheckForm.controls;
  }

  ngOnInit() {
    this.studentCheckForm = this.formBuilder.group({
      selectDrop: ['', Validators.required],
      studentName: ['', Validators.required]
    });


  }

  public getReports(): any {
    return new Observable(observer => {
      observer.next(this.reports);
    });
  }

  onSubmit() {

    this.studentService.getReportsByName(this.f.studentName.value)
      .pipe(first())
      .subscribe(
        data => {
          const reportsObservable = this.getReports();
          reportsObservable.subscribe((report) => {
            this.reports = report;
          });
          this.exploitReports(data);
        },
        error => {
          alert(error.error);
        });
  }

  displayEditReport(id: number) {
    this.shouldBeDisplayed = true;
    this.actualReportId = id;
  }

  //TODO
  downloadReport() {
  }

  //TODO
  validateReport() {

  }

  private exploitReports(data) {
    if (Object.keys(data).length == 0) {
      alert('Aucun étudiant trouvé');
      return;
    }

    this.shouldSelectBeVisible = false;

    for (let i = 0; i < data.length; i++) {
      this.reports.push(data[i]);
    }
  }
}
