import {Component, OnInit} from '@angular/core';
import {Student} from '../../../models/student';
import {Utils} from '../../../models/utils';


@Component({
  selector: 'app-student-informations',
  templateUrl: './student-informations.component.html',
  styleUrls: ['./student-informations.component.css']
})
export class StudentInformationsComponent implements OnInit {
  student: Student;
  isStudent: boolean;

  constructor() {
    this.student = Utils.getUser();
    this.isStudent = Utils.isStudent();
    console.log('this.student => ', this.student);
    console.log('this.isStudent => ', this.isStudent);
  }

  ngOnInit() {
  }

}
