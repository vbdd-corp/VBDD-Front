import {Component, Input, OnInit} from '@angular/core';
import {Utils} from '../../../../models/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReportCreatorService} from '../../../../services/report-creator.service';
import {first} from 'rxjs/operators';
import {ModuleComponent} from '../../module-component';

@Component({
  selector: 'app-contrat-etudiant-asie',
  templateUrl: './contrat-etudiant-asie.component.html',
  styleUrls: ['./contrat-etudiant-asie.component.css']
})
export class ContratEtudiantAsieComponent implements OnInit {


  contratForm: FormGroup;
  @Input() report: any;

  constructor(private formBuilder: FormBuilder, private creatorSerive: ReportCreatorService) {
  }

  get f() {
    return this.contratForm.controls;
  }

  private static getContratValuesToJson() {
    return {

      date1: ['', Validators.required],
      date2: ['', Validators.required],
      date3: ['', Validators.required],
      diploma1: ['', Validators.required],
      diploma2: ['', Validators.required],
      diploma3: ['', Validators.required],
      note1: ['', Validators.required],
      note2: ['', Validators.required],
      note3: ['', Validators.required],
      school1: ['', Validators.required],
      school2: ['', Validators.required],
      school3: ['', Validators.required],
      university1: ['', Validators.required],
      university2: ['', Validators.required],
      university3: ['', Validators.required],
      pays1: ['', Validators.required],
      pays2: ['', Validators.required],
      pays3: ['', Validators.required],
      isFullYear: ['', Validators.required],
      isFirstSemester: ['', Validators.required],
      isSecondSemester: ['', Validators.required],

    };
  }

  ngOnInit() {
    this.contratForm = this.formBuilder.group(ContratEtudiantAsieComponent.getContratValuesToJson());
  }

  getFullName() {
    return Utils.getStudent().firstName + ' ' + Utils.getStudent().lastName;
  }

  isMan() {
    return Utils.getStudent().gender === 'M';
  }

  getBirthday() {
    return Utils.getStudent().birthDate;
  }

  getNationalite() {
    return Utils.getStudent().nationality;
  }

  getCodePostal() {
    return Utils.getStudent().postalCode;
  }

  getCity() {
    return Utils.getStudent().city;
  }

  getAddress() {
    return Utils.getStudent().address;
  }

  getMajor() {
    return Utils.getStudent().major;
  }

  getStudentNumber() {
    return Utils.getStudent().studentNumber;
  }

  getMail() {
    return Utils.getStudent().mail;
  }

  getPhone() {
    return Utils.getStudent().phoneNumber;
  }

  onSubmit() {

    this.creatorSerive.updateModule(ModuleComponent.getModuleId(this.report.moduleIds, 7), this.getContratValues())
      .pipe(first())
      .subscribe();
  }

  private getContratValues() {
    return {

      date1: this.f.date1.value,
      date2: this.f.date2.value,
      date3: this.f.date3.value,
      diploma1: this.f.diploma1.value,
      diploma2: this.f.diploma2.value,
      diploma3: this.f.diploma3.value,
      note1: this.f.note1.value,
      note2: this.f.note2.value,
      note3: this.f.note3.value,
      school1: this.f.school1.value,
      school2: this.f.school2.value,
      school3: this.f.school3.value,
      university1: this.f.university1.value,
      university2: this.f.university2.value,
      university3: this.f.university3.value,
      pays1: this.f.pays1.value,
      pays2: this.f.pays2.value,
      pays3: this.f.pays3.value,
      isFullYear: this.f.isFullYear.value,
      isFirstSemester: this.f.isFirstSemester.value,
      isSecondSemester: this.f.isSecondSemester.value,

    };
  }


}
