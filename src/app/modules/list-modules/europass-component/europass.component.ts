import {Component, Input, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ReportCreatorService} from '../../../../services/report-creator.service';

@Component({
  selector: 'app-europass-component',
  templateUrl: './europass.component.html',
  styleUrls: ['./europass.component.css']
})
export class EuropassComponent implements OnInit {
  @Input() report: any;

  constructor(private route: ActivatedRoute, private creatorService: ReportCreatorService) {
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.creatorService.updateModule(4, '') //TODO c'est du file Upload... ):
      .pipe(first())
      .subscribe();
  }

}
