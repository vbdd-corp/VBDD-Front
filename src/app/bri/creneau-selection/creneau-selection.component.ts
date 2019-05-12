import {Component, OnDestroy, OnInit} from '@angular/core';
import {format} from "date-fns";
import {Utils} from '../../../models/utils';
import {Plage} from '../../../models/plage';
import {Subscription} from 'rxjs';
import {Creneau} from '../../../models/creneau';
import {CreneauService} from '../../../services/creneau.service';
const frLocale = require('date-fns/locale/fr');

@Component({
  selector: 'app-creneau-selection',
  templateUrl: './creneau-selection.component.html',
  styleUrls: ['./creneau-selection.component.css']
})
export class CreneauSelectionComponent implements OnInit, OnDestroy {

  selectedCreneau :Creneau;
  subCreneauService :Subscription;

  constructor(private creneauService :CreneauService) {
    this.subCreneauService = this.creneauService.getSelectedCreneau().subscribe( creneau => {
      this.selectedCreneau = creneau;
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subCreneauService.unsubscribe();
  }


  getDayString(){
    return format(
      Utils.getDateFromTime(this.selectedCreneau.start),
      'dddd D MMMM',
      {locale: frLocale}
    );

  }

  getTimeString(){
    return format(
      Utils.getDateFromTime(this.selectedCreneau.start),
      'HH[h]mm',
      {locale: frLocale}
      )
      + "-" +
      format(
        Utils.getDateFromTime(this.selectedCreneau.end),
        'HH[h]mm',
        {locale: frLocale}
      )
  }

}
