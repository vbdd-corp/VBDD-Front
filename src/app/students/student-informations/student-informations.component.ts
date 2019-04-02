import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../../models/student';

@Component({
  selector: 'app-student-informations',
  templateUrl: './student-informations.component.html',
  styleUrls: ['./student-informations.component.css']
})
export class StudentInformationsComponent implements OnInit {
  @Input()
  student: Student;

  constructor() {
    this.student = new Student(localStorage.getItem('User'));
  }

  ngOnInit() {
  }

}
