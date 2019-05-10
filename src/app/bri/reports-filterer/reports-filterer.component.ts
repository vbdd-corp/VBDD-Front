import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../services';
import {DossierService} from '../../../services/dossier.service';
import {Subscription} from 'rxjs';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-reports-filterer',
  templateUrl: './reports-filterer.component.html',
  styleUrls: ['./reports-filterer.component.css']
})
export class ReportsFiltererComponent implements OnInit {

  filterForm: FormGroup;
  dossiers: Array<any>;
  initialDossiers: Array<any>;
  sub: Subscription;
  private filtersList = ['ecole', 'cursus', 'pays', 'etudiant'];

  constructor(private formBuilder: FormBuilder, private alertService: AlertService, private dossierService: DossierService) {
    this.dossierService.getAllFiles();
    this.sub = this.dossierService.files$.subscribe(files => this.dossiers = files);
  }

  get f() {
    return this.filterForm.controls;
  }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      filter: ['', Validators.required]
    });
  }

  downloadAsCSV() {
    var doc = new jsPDF();
    doc.autoTable({html: '#mainTable'});
    doc.save('dossiers' + Math.floor(Math.random() * Math.floor(999)) + '.pdf');
  }

  splitFilterInput() {
    return this.f.filter.value.split(':');
  }

  filter() {
    this.alertService.clear();
    if (this.isValid(this.splitFilterInput()[0])) {
      this.filterTable(this.splitFilterInput()[0], this.splitFilterInput()[1]);
    } else {
      this.alertService.error('Le filtre "' + this.f.filter.value + '" n\'est pas valide !');
    }
  }

  reset() {
    this.dossiers = this.initialDossiers;
  }

  private isValid(filter) {
    if (this.f.filter.value.indexOf(':') <= -1) {
      return false;
    }
    return !(this.filtersList.indexOf(filter) <= -1);
  }

  private filterTable(filter: string, value: string) {
    console.log('Filtre : ' + filter + ' | Valeur : ' + value);

    switch (filter) {
      case this.filtersList[0]:
        //ecole


        break;
      case this.filtersList[1]:
        //cursus

        break;
      case this.filtersList[2]:
        //pays

        break;
      case this.filtersList[3]:
        //etudiant
        const fullName = value.split(' ');
        let nom = fullName[0];
        let prenom = fullName[1];

        for (let i = 0; i < this.dossiers.length; i++) {
          if (!(this.dossiers[i].student.firstName.toLowerCase() == prenom.toLowerCase() && this.dossiers[i].student.lastName.toLowerCase() == nom.toLowerCase())) {
            this.dossiers.splice(i, 1);
          }
        }

        break;
    }
  }
}
