import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {AlertService} from '../../../services';
import {DossierService} from '../../../services/dossier.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  dossiers = [];

  constructor(private dossierService: DossierService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.putReportsInDom();
  }

  putReportsInDom() {
    this.dossierService.getDossiers()
      .pipe(first())
      .subscribe(
        data => {
          this.addEachReportsToDom(JSON.stringify(data));
        },
        error => {
          this.alertService.error(error.error.error);
        });
  }

  addInput() {
    const dossierName = prompt('Quel est le nom du dossier ?', 'Mon dossier');
    this.dossiers.push({name: dossierName, id: dossierName, kind: 'new'});

  }

  private addEachReportsToDom(data: string) {
    let parsedReports = JSON.parse(data);
    for (let i in parsedReports) {
      this.dossiers.push({dossier: parsedReports[i], kind: 'edit', name: parsedReports[i].name, id: parsedReports[i].id});
    }
  }

  private deleteReport(id: number) {
    this.dossierService.removeDossier(id)
      .pipe(first())
      .subscribe(
        data => {

        },
        error => {
          this.alertService.error(error.error.error);
        });
  }
}
