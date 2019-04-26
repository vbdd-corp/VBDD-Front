import {Component, Input, OnInit} from '@angular/core';
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
  private _reportCategory: string;
  private reportName: string;
  isCreated: boolean = false;

  @Input()
  public _reportBeingCreated: any;

  constructor(private route: ActivatedRoute, private creatorService: ReportCreatorService) {
  }

  get reportCategory(): number {
    return parseInt(this._reportCategory);
  }

  get reportBeingCreated(): any {
    return this._reportBeingCreated;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this._reportCategory = params['type'];
      this.reportName = params['id'];
    });

    this.saveReport();

  }

  public saveReport() {
    this.creatorService.create(+this._reportCategory, this.reportName)
      .pipe(first())
      .subscribe(
        data => {
          // this.isCreated = true;
          this._reportBeingCreated = data;
        },
        error => {
          alert(error.error.error);
        });

  }
}
