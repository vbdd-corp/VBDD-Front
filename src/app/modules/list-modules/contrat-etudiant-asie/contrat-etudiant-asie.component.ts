import {Component, OnInit} from '@angular/core';
import {Utils} from '../../../../models/utils';

@Component({
  selector: 'app-contrat-etudiant-asie',
  templateUrl: './contrat-etudiant-asie.component.html',
  styleUrls: ['./contrat-etudiant-asie.component.css']
})
export class ContratEtudiantAsieComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
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

  //mobile, n0 etudiant, inscription SI3, mail


}
