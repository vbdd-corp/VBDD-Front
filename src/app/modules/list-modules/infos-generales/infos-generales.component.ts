import {Student} from '../../../../models/student';
import {Utils} from '../../../../models/utils';
import {StudentService} from '../../../../services/student.service';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModuleService} from "../../../../services/module.service";

@Component({
  selector: 'app-infos-generales',
  templateUrl: './infos-generales.component.html',
  styleUrls: ['./infos-generales.component.css']
})
export class InfosGeneralesComponent implements OnInit {

  student: Student;
  isStudent: boolean;
  generalInformationsForm: FormGroup;
  @Input() module: any;
  isValidated: boolean = false;

  constructor(private formBuilder: FormBuilder, private moduleService: ModuleService, private studentService: StudentService) {
    this.student = Utils.getUser();
    this.isStudent = Utils.isStudent();
    console.log('this.student == ', this.student);
    console.log('this.isStudent == ', this.isStudent);
  }

  ngOnInit() {
    this.generalInformationsForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      studentNumber: [''],
      INE: [''],
      phoneNumber: [''],
      mobilePhoneNumber: [''],
      postalCode: [''],
      city: [''],
      nationality: [''],
      major: [''],
      gender: [''],
      birthDate: [''],
      mail: [''],
      address: [''],
      exampleCheck1: [''],

      datediploma1: [''],
      diploma1: [''],
      school1: [''],
      note1: [''],
      datediploma2: [''],
      diploma2: [''],
      school2: [''],
      note2: [''],
      datediploma3: [''],
      diploma3: [''],
      school3: [''],
      note3: ['']
    });
  }

  onSubmit() {

  }

}
