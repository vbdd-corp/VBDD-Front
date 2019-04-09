import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {ReportCreatorService} from '../../../services/report-creator.service';

@Component({
  selector: 'app-new-report',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewReportComponent implements OnInit {
  private sub: any;
  private reportCategory: string;
  private reportName: string;
  isCreated: boolean = false;

  constructor(private route: ActivatedRoute, private creatorService: ReportCreatorService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.reportCategory = params['type'];
      this.reportName = params['id'];
    });
  }

  public saveReport() {
    this.creatorService.create(+this.reportCategory, this.reportName)
      .pipe(first())
      .subscribe(
        data => {
          this.isCreated = true;
          alert('Votre dossier a bien été crée !');
        },
        error => {
          alert(error.error.error);
        });
  }

}
