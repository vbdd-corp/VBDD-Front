import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReportCreatorService} from '../../../services/report-creator.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-new-report',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewReportComponent implements OnInit {
  private sub: any;
  private reportCategory: string;
  private reportName: string;

  constructor(private route: ActivatedRoute, private creatorService: ReportCreatorService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.reportCategory = params['type'];
      this.reportName = params['id'];
    });

    this.saveReport();
  }

  private saveReport() {
    this.creatorService.create(this.reportCategory, this.reportName)
      .pipe(first())
      .subscribe(
        data => {
        },
        error => {
          alert(error.error.error.toString());
        });
  }

}
