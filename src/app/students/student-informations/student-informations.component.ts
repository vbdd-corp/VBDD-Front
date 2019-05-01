import {Component, OnInit} from '@angular/core';
import {Student} from '../../../models/student';
import {Utils} from '../../../models/utils';
import {StudentService} from '../../../services/student.service';
import {element} from 'protractor';
import {add} from 'ngx-bootstrap/chronos';


@Component({
  selector: 'app-student-informations',
  templateUrl: './student-informations.component.html',
  styleUrls: ['./student-informations.component.css']
})
export class StudentInformationsComponent implements OnInit {
  student: Student;
  isStudent: boolean;
  onEditedMode: boolean = false;

  constructor(private studentService: StudentService) {
    this.student = Utils.getUser();
    this.isStudent = Utils.isStudent();
    // console.log('this.student => ', this.student);
    // console.log('this.isStudent => ', this.isStudent);
  }


  ngOnInit() {
  }

  toggle() {
    this.onEditedMode = !this.onEditedMode;
    let tdList = document.querySelectorAll('div.info-container td') as NodeListOf<HTMLElement>;
    if (this.onEditedMode) {
      for (let i = 0; i < tdList.length; ++i) {
        tdList[i].setAttribute('contentEditable', 'true');
        tdList[i].style.border = '2px solid #5BC0DE';
      }
    } else {
      for (let i = 0; i < tdList.length; ++i) {
        tdList[i].setAttribute('contentEditable', 'false');
        tdList[i].style.border = '1px solid #ddd';
        // tdList[i].setAttribute(   'border', '1px solid #ddd');
      }
    }
  }

  saveModifications() {
    this.toggle();
    let mail = document.getElementById('mail').innerText;
    let firstName = document.getElementById('firstName').innerText;
    let lastName = document.getElementById('lastName').innerText;
    let major = document.getElementById('major').innerText;
    let gender = document.getElementById('gender').innerText;
    let nationality = document.getElementById('nationality').innerText;
    let birthDate = document.getElementById('birthDate').innerText;
    let INE = document.getElementById('INE').innerText;
    let studentNumber = document.getElementById('studentNumber').innerText;
    let address = document.getElementById('address').innerText;
    let city = document.getElementById('city').innerText;
    let postalCode = document.getElementById('postalCode').innerText;
    let mobilePhoneNumber = document.getElementById('mobilePhoneNumber').innerText;
    let phoneNumber = document.getElementById('phoneNumber').innerText;

    let stud = {
      'mail': mail,
      'firstName': firstName,
      'lastName': lastName,
      'major': major,
      'gender': gender,
      'nationality': nationality,
      'birthDate': birthDate,
      'INE': INE,
      'studentNumber': studentNumber,
      'address': address,
      'city': city,
      'postalCode': postalCode,
      'mobilePhoneNumber': mobilePhoneNumber,
      'phoneNumber': phoneNumber
    };

    console.log('stud ==> ', stud);
    /* this.studentService.updateStudent()*/
  }
}
