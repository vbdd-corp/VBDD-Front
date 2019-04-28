import { Component, OnInit } from '@angular/core';
import {Utils} from '../../../models/utils';
import {Student} from '../../../models/student';

@Component({
  selector: 'app-std-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeStdComponent implements OnInit {
  student: Student;

  constructor() {
    this.student = Utils.getStudent();
  }

  ngOnInit() {
  }

}
