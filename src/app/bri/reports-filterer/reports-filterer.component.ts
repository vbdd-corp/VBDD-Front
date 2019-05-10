import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../services';
import {DossierService} from '../../../services/dossier.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-reports-filterer',
  templateUrl: './reports-filterer.component.html',
  styleUrls: ['./reports-filterer.component.css']
})
export class ReportsFiltererComponent implements OnInit {

  filterForm: FormGroup;
  dossiers: Array<any>;
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

  private filterTable(filter: string, value: string) {
    console.log('Filtre : ' + filter + ' | Valeur : ' + value);

  }

  private isValid(filter) {
    if (this.f.filter.value.indexOf(':') <= -1) {
      return false;
    }
    return !(this.filtersList.indexOf(filter) <= -1);
  }
}
