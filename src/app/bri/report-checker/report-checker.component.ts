import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-report-checker',
  templateUrl: './report-checker.component.html',
  styleUrls: ['./report-checker.component.css']
})
export class ReportCheckerComponent implements OnInit {
  studentCheckForm: FormGroup;
  reports: any;

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

  onSubmit() {
    console.log(this.f);
    console.log(this.f.studentName);
    this.studentService.getReportsByName(this.f.studentName.toString())
      .pipe(first())
      .subscribe(
        data => {
          for (let report in data) {
            this.reports.push(report);
          }
        },
        error => {
          alert(error.error);
        });
  }
}
