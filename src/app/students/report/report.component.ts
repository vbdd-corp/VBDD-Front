import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  dossiers = [];

  constructor() {
  }

  ngOnInit() {
    this.feedDossiers();
  }

  addInput() {
    const dossierName = prompt('Quel est le nom du dossier ?', 'Dossier N');
    this.dossiers.push({value: dossierName});
  }

  private feedDossiers() {
    // TODO : GET une liste de dossiers d'un user par son ID, et remplii this.dossiers en conséquence;
    this.dossiers.push({value: 'xx'});
  }
}
