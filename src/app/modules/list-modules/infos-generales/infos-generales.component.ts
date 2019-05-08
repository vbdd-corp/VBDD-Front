import {Student} from '../../../../models/student';
import {Utils} from '../../../../models/utils';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModuleService} from '../../../../services/module.service';
import {Module} from "../../../../models/module";

@Component({
  selector: 'app-infos-generales',
  templateUrl: './infos-generales.component.html',
  styleUrls: ['./infos-generales.component.css']
})
export class InfosGeneralesComponent implements OnInit {

  student: Student;
  isStudent: boolean;
  generalInformationsForm: FormGroup;
  @Input() module: Module;
  isValidated: boolean = false;

  constructor(private formBuilder: FormBuilder, private moduleService: ModuleService) {

  }

  ngOnInit() {
    this.student = Utils.getUser();
    this.isStudent = Utils.isStudent();
    console.log('this.module.id == ', this.module.id);
    this.generalInformationsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      studentNumber: ['', Validators.required],
      INE: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      mobilePhoneNumber: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      nationality: ['', Validators.required],
      major: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      mail: ['', Validators.required],
      address: ['', Validators.required],

      exampleCheck1: ['', Validators.required],
      datediploma1: ['', Validators.required],
      datediploma2: ['', Validators.required],
      datediploma3: ['', Validators.required],
      diploma1: ['', Validators.required],
      diploma2: ['', Validators.required],
      diploma3: ['', Validators.required],
      school1: ['', Validators.required],
      school2: ['', Validators.required],
      school3: ['', Validators.required],
      note1: ['', Validators.required],
      note2: ['', Validators.required],
      note3: ['', Validators.required],
    });
  }

  get f() {
    return this.generalInformationsForm.controls;
  }

  onSubmit() {

    //this.moduleService.updateModule(this.module.id, ());

    console.log('Test1 => ', this.generalInformationsForm.controls.firstName.value);
    console.log('Test2 => ', this.generalInformationsForm.controls['firstName'].value);
    console.log('Test3 => ', this.generalInformationsForm.value.firstName);
    console.log('Test4 => ', this.generalInformationsForm.get('firstName').value);

    const info1 = {
      firstName: this.generalInformationsForm.controls.firstName.value,
      lastName: this.generalInformationsForm.controls['lastName'].value,
      studentNumber: this.generalInformationsForm.value.studentNumber,
      INE: this.generalInformationsForm.value.INE,
      phoneNumber: this.generalInformationsForm.value.phoneNumber,
      mobilePhoneNumber: this.generalInformationsForm.value.mobilePhoneNumber,
      postalCode: this.generalInformationsForm.value.postalCode,
      city: this.generalInformationsForm.value.city
      /*nationality: this.f.value.nationality,
      major: this.f.value.major,
      gender: this.f.value.gender,
      birthDate: this.f.value.birthDate,
      mail: this.f.value.mail,
      address: this.f.value.address,*/

    };

    console.log('info1 == ', info1);

    const info2 = {
      studentId: this.student.id,

      "stayCardEndValidity": null,
      "currentUNSDiploma": null,
      "nextYearExchangeDiploma": null,

      shareMyDetails: this.f.exampleCheck1.value,
      datediploma1: this.f.datediploma1.value,
      datediploma2: this.f.datediploma2.value,
      datediploma3: this.f.datediploma3.value,
      diploma1: this.f.diploma1.value,
      diploma2: this.f.diploma2.value,
      diploma3: this.f.diploma3.value,
      school1: this.f.school1.value,
      school2: this.f.school2.value,
      school3: this.f.school3.value,
      note2: this.f.note2.value,
      note1: this.f.note1.value,
      note3: this.f.note3.value,
    };

    console.log('info2 == ', info2);

    this.isValidated = true;
  }

}
