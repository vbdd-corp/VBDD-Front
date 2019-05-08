import {Student} from '../../../../models/student';
import {Utils} from '../../../../models/utils';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModuleService} from '../../../../services/module.service';

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

  constructor(private formBuilder: FormBuilder, private moduleService: ModuleService) {
    this.student = Utils.getUser();
    this.isStudent = Utils.isStudent();
  }

  get f() {
    return this.generalInformationsForm.controls;
  }

  ngOnInit() {
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
      diploma1: ['', Validators.required],
      school1: ['', Validators.required],
      note1: ['', Validators.required],
      datediploma2: ['', Validators.required],
      diploma2: ['', Validators.required],
      school2: ['', Validators.required],
      note2: ['', Validators.required],
      datediploma3: ['', Validators.required],
      diploma3: ['', Validators.required],
      school3: ['', Validators.required],
      note3: ['', Validators.required],
    });
  }

  onSubmit() {

    this.moduleService.updateModule(this.module.id, ({
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      studentNumber: this.f.studentNumber.value,
      INE: this.f.INE.value,
      phoneNumber: this.f.phoneNumber.value,
      mobilePhoneNumber: this.f.mobilePhoneNumber.value,
      postalCode: this.f.postalCode.value,
      city: this.f.city.value,
      nationality: this.f.nationality.value,
      major: this.f.major.value,
      gender: this.f.gender.value,
      birthDate: this.f.birthDate.value,
      mail: this.f.mail.value,
      address: this.f.address.value,
      exampleCheck1: this.f.exampleCheck1.value,
      datediploma1: this.f.datediploma1.value,
      diploma1: this.f.diploma1.value,
      school1: this.f.school1.value,
      note1: this.f.note1.value,
      datediploma2: this.f.datediploma2.value,
      diploma2: this.f.diploma2.value,
      school2: this.f.school2.value,
      note2: this.f.note2.value,
      datediploma3: this.f.datediploma3.value,
      diploma3: this.f.diploma3.value,
      school3: this.f.school3.value,
      note3: this.f.note3.value,

    }));

    this.isValidated = true;
  }

}
