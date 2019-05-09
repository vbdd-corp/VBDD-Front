import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {StudentService} from '../../../services/student.service';
import {Observable} from 'rxjs';
import {DossierService} from '../../../services/dossier.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DownloadService} from '../../../services/download.service';

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
  name: string = '';
  actualReportId: number;
  reportValidated: boolean = false;
  disableSelect: boolean = false;


  constructor(private downloadService: DownloadService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private studentService: StudentService, private reportService: DossierService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.name = params['name'];
    });
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

    //For the guy coming to this part, i'm so sorry, it's a bit dirty and buggy... let's say it's a Alpha 0.0.1_a version right ?

    // @ts-ignore

    const inputValue = document.getElementById('studentName').value;

    if (inputValue !== '') {
      this.name = inputValue;
    }

    if (this.clearSelect()) {
      this.studentService.getReportsByName(this.name)
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

  }

  private clearSelect(): boolean {
    this.reports = [];
    return true;
  }

  displayEditReport(id: number) {
    this.shouldBeDisplayed = true;
    this.disableSelect = true;
    this.actualReportId = id;
  }

  ///TODO ? gl...
  downloadReport() {
  }

  validateReport() {
    this.reportService.validateReport(this.actualReportId);
    this.reportValidated = true;
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

  refresh() {
    document.location.href = '/reportChecker/?name=' + this.f.studentName.value;
  }
}
