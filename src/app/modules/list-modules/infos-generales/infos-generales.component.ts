import {Student} from '../../../../models/student';
import {Utils} from '../../../../models/utils';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModuleService} from '../../../../services/module.service';
import {Module} from '../../../../models/module';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {StudentService} from "../../../../services/student.service";


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
  @ViewChild('myDatePicker')
  private elDatePicker : ElementRef;
  isValidated: boolean = false;
  locale = 'fr';

  constructor(private formBuilder: FormBuilder,
              private studentService: StudentService,
              private moduleService: ModuleService,
              private localeService: BsLocaleService) {
  }

  get f() {
    return this.generalInformationsForm.controls;
  }

  ngOnInit() {
    this.student = Utils.getUser();
    this.isStudent = Utils.isStudent();
    this.localeService.use(this.locale);

    console.log('this.module.id == ', this.module.id);
    console.log('this.module == ', this.module);

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


      stayCardEndValidity: [''],
      currentUNSDiploma: ['', Validators.required],
      nextYearExchangeDiploma: ['', Validators.required],
      shareMyDetails: ['', Validators.required],

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

    this.generalInformationsForm.controls['firstName'].setValue(this.student.firstName);
    this.generalInformationsForm.controls['lastName'].setValue(this.student.lastName);
    this.generalInformationsForm.controls['studentNumber'].setValue(this.student.studentNumber);
    this.generalInformationsForm.controls['INE'].setValue(this.student.INE);
    this.generalInformationsForm.controls['phoneNumber'].setValue(this.student.phoneNumber);

    this.generalInformationsForm.controls['mobilePhoneNumber'].setValue(this.student.mobilePhoneNumber);
    this.generalInformationsForm.controls['postalCode'].setValue(this.student.postalCode);
    this.generalInformationsForm.controls['city'].setValue(this.student.city);
    this.generalInformationsForm.controls['nationality'].setValue(this.student.nationality);
    this.generalInformationsForm.controls['major'].setValue(this.student.major);
    this.generalInformationsForm.controls['gender'].setValue(this.student.gender);

    this.generalInformationsForm.controls['birthDate'].setValue(this.student.birthDate);
    this.generalInformationsForm.controls['mail'].setValue(this.student.mail);
    this.generalInformationsForm.controls['address'].setValue(this.student.address);

    this.generalInformationsForm.controls['datediploma1'].setValue(this.module.infos.datediploma1);
    this.generalInformationsForm.controls['diploma1'].setValue(this.module.infos.diploma1);
    this.generalInformationsForm.controls['school1'].setValue(this.module.infos.school1);
    this.generalInformationsForm.controls['note1'].setValue(this.module.infos.note1);

    this.generalInformationsForm.controls['datediploma2'].setValue(this.module.infos.datediploma2);
    this.generalInformationsForm.controls['diploma2'].setValue(this.module.infos.diploma2);
    this.generalInformationsForm.controls['school2'].setValue(this.module.infos.school2);
    this.generalInformationsForm.controls['note2'].setValue(this.module.infos.note2);

    this.generalInformationsForm.controls['datediploma3'].setValue(this.module.infos.datediploma3);
    this.generalInformationsForm.controls['diploma3'].setValue(this.module.infos.diploma3);
    this.generalInformationsForm.controls['school3'].setValue(this.module.infos.school3);
    this.generalInformationsForm.controls['note3'].setValue(this.module.infos.note3);

    this.generalInformationsForm.controls['shareMyDetails'].setValue(this.module.infos.shareMyDetails);
    this.generalInformationsForm.controls['currentUNSDiploma'].setValue(this.module.infos.currentUNSDiploma);
    this.generalInformationsForm.controls['nextYearExchangeDiploma'].setValue(this.module.infos.nextYearExchangeDiploma);

    this.generalInformationsForm.controls['stayCardEndValidity'].setValue(new Date());

    if (this.f.nationality.value.toString().toUpperCase() === 'FR')
      this.elDatePicker.nativeElement.style.display = 'none';
    else
      this.elDatePicker.nativeElement.style.display = 'block';
  }

  onNationalityChange(event) {
    let value = event.target.value;
    value = value.toUpperCase();
    if (value === 'FR') {
      // console.log('this.elDatePicker == ', this.elDatePicker.nativeElement);
      this.elDatePicker.nativeElement.style.display = 'none';
      //this.elLabelPicker.nativeElement.style.display = 'none';
    } else {
      this.elDatePicker.nativeElement.style.display = 'block';
      //this.elLabelPicker.nativeElement.style.display = 'block';
    }
  }

  onSubmit() {
    console.log('this.student.id == ', this.student.id);
    const info1 = {
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
      address: this.f.address.value
    };
    console.log('info1 == ', info1);

    console.log('student before => ', this.student);
    this.student = Object.assign({}, this.student, info1);
    console.log('student after => ', this.student);

    this.studentService.updateStudent(this.student);
    Utils.setStudent(this.student);


    /*stayCardEndValidity: null,*/
    let info2 = {
      studentId: this.student.id,


      currentUNSDiploma: null,
      nextYearExchangeDiploma: null,

      shareMyDetails: this.f.shareMyDetails.value,
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

    if (this.elDatePicker.nativeElement.style.display === 'block')
      info2 = Object.assign({}, info2, {
        stayCardEndValidity: Utils.getTimeFromDate(
          new Date(this.f.stayCardEndValidity.value)
        ),
      });



    console.log('info2 == ', info2);
    const temp = new Date(this.f.stayCardEndValidity.value);
    console.log('temp == ', temp);
    console.log('myDateValue == ', Utils.getTimeFromDate(temp));


    this.isValidated = true;
  }


}
