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
  isValidated: boolean = false;

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
      codeCours1: ['', Validators.required],
      codeCours2: ['', Validators.required],
      codeCours3: ['', Validators.required],
      codeCours4: ['', Validators.required],
      codeCours5: ['', Validators.required],
      codeCours6: ['', Validators.required],
      codeCours7: ['', Validators.required],
      codeCours8: ['', Validators.required],
      codeCours9: ['', Validators.required],
      codeCours10: ['', Validators.required],
      codeCours11: ['', Validators.required],
      codeCours12: ['', Validators.required],
      titreCours1: ['', Validators.required],
      titreCours2: ['', Validators.required],
      titreCours3: ['', Validators.required],
      titreCours4: ['', Validators.required],
      titreCours5: ['', Validators.required],
      titreCours6: ['', Validators.required],
      titreCours7: ['', Validators.required],
      titreCours8: ['', Validators.required],
      titreCours9: ['', Validators.required],
      titreCours10: ['', Validators.required],
      titreCours11: ['', Validators.required],
      titreCours12: ['', Validators.required],
      nombreCredits1: ['', Validators.required],
      nombreCredits2: ['', Validators.required],
      nombreCredits3: ['', Validators.required],
      nombreCredits4: ['', Validators.required],
      nombreCredits5: ['', Validators.required],
      nombreCredits6: ['', Validators.required],
      nombreCredits7: ['', Validators.required],
      nombreCredits8: ['', Validators.required],
      nombreCredits9: ['', Validators.required],
      nombreCredits10: ['', Validators.required],
      nombreCredits11: ['', Validators.required],
      nombreCredits12: ['', Validators.required],

    }
      ;
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

    this.creatorSerive.updateModule
    (
      ModuleComponent.getModuleId(this.report.modules, 8), this.getContratValues()
    )
      .pipe(first())
      .subscribe();

    this.isValidated = true;
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
      codeCours1: this.f.codeCours1.value,
      codeCours2: this.f.codeCours2.value,
      codeCours3: this.f.codeCours3.value,
      codeCours4: this.f.codeCours4.value,
      codeCours5: this.f.codeCours5.value,
      codeCours6: this.f.codeCours6.value,
      codeCours7: this.f.codeCours7.value,
      codeCours8: this.f.codeCours8.value,
      codeCours9: this.f.codeCours9.value,
      codeCours10: this.f.codeCours10.value,
      codeCours11: this.f.codeCours11.value,
      codeCours12: this.f.codeCours12.value,
      titreCours1: this.f.titreCours1.value,
      titreCours2: this.f.titreCours2.value,
      titreCours3: this.f.titreCours3.value,
      titreCours4: this.f.titreCours4.value,
      titreCours5: this.f.titreCours5.value,
      titreCours6: this.f.titreCours6.value,
      titreCours7: this.f.titreCours7.value,
      titreCours8: this.f.titreCours8.value,
      titreCours9: this.f.titreCours9.value,
      titreCours10: this.f.titreCours10.value,
      titreCours11: this.f.titreCours11.value,
      titreCours12: this.f.titreCours12.value,
      nombreCredits1: this.f.nombreCredits1.value,
      nombreCredits2: this.f.nombreCredits2.value,
      nombreCredits3: this.f.nombreCredits3.value,
      nombreCredits4: this.f.nombreCredits4.value,
      nombreCredits5: this.f.nombreCredits5.value,
      nombreCredits6: this.f.nombreCredits6.value,
      nombreCredits7: this.f.nombreCredits7.value,
      nombreCredits8: this.f.nombreCredits8.value,
      nombreCredits9: this.f.nombreCredits9.value,
      nombreCredits10: this.f.nombreCredits10.value,
      nombreCredits11: this.f.nombreCredits11.value,
      nombreCredits12: this.f.nombreCredits12.value,


    };
  }


}
