import {Component, Input, OnInit} from '@angular/core';
import {StudentSingleton} from '../../../models/studentSingleton';

@Component({
  selector: 'app-student-informations',
  templateUrl: './student-informations.component.html',
  styleUrls: ['./student-informations.component.css']
})
export class StudentInformationsComponent implements OnInit {
  @Input()
  student: StudentSingleton;

  constructor() {
    this.student = StudentSingleton.getInstance();
  }

  ngOnInit() {
  }

}
