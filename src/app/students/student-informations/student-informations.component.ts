import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {Student} from '../../../models/student';
import {Utils} from '../../../models/utils';
import {element} from 'protractor';


@Component({
  selector: 'app-student-informations',
  templateUrl: './student-informations.component.html',
  styleUrls: ['./student-informations.component.css']
})
export class StudentInformationsComponent implements OnInit {
  student: Student;
  isStudent: boolean;
  onEditedMode: boolean = false;
  elementRef: ElementRef;

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.student = Utils.getUser();
    this.isStudent = Utils.isStudent();
    console.log('this.student => ', this.student);
    console.log('this.isStudent => ', this.isStudent);
  }


  ngOnInit() {
  }

  toggle() {
    this.onEditedMode = !this.onEditedMode;
    let tdList = this.elementRef.nativeElement.querySelectorAll('td');
    if (this.onEditedMode) {
      for (let i = 0; i < tdList.length; ++i) {
        tdList[i].setAttribute('contentEditable', true);
        tdList[i].style.border = '2px solid #5BC0DE';
      }
    } else {
      for (let i = 0; i < tdList.length; ++i) {
        tdList[i].setAttribute('contentEditable', false);
        tdList[i].style.border = '1px solid #ddd';
      }
    }
  }

}
