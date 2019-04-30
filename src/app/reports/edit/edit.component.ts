import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DossierService} from '../../../services/dossier.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  sub: any;
  report: any;

  constructor(private route: ActivatedRoute, private dossierService: DossierService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.dossierService.getDossier(params['id']).subscribe( report => {
        this.report = report;
      });
    });
  }

}
