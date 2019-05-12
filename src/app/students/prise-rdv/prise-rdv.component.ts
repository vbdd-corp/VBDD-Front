import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AppointmentType} from '../../../models/appointment-type';
import {Creneau} from '../../../models/creneau';
import {CreneauService} from '../../../services/creneau.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
const frLocale = require('date-fns/locale/fr');
import {Subscription} from 'rxjs';
import {format} from "date-fns";
import {Utils} from '../../../models/utils';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-prise-rdv',
  templateUrl: './prise-rdv.component.html',
  styleUrls: ['./prise-rdv.component.css']
})
export class PriseRdvComponent implements OnInit {

  appointmentTypeSelected : AppointmentType;
  modalRef: BsModalRef;

  creneauSelected: Creneau;
  creneauServiceSub: Subscription;

  @ViewChild('reservation') reservation: TemplateRef<any>;

  constructor(private creneauService: CreneauService, private modalService: BsModalService) {
    this.creneauServiceSub = creneauService.getSelectedCreneau().subscribe( creneau => {
      if( creneau ) {
        this.creneauSelected = creneau;
        this.openModal(this.reservation);
      }
    });
  }

  ngOnInit() {

  }

  selectAppointmentType(appointmentTypeSelected: AppointmentType) {
    this.creneauService.getCreneauxByAppointmentType(appointmentTypeSelected.id);
    this.appointmentTypeSelected = appointmentTypeSelected;
  }

  openModal(template: TemplateRef<any>) {
    if (this.modalRef) {
      this.closeModal();
    }
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  getDayString(){
    return format(
      Utils.getDateFromTime(this.creneauSelected.start),
      'dddd D MMMM',
      {locale: frLocale}
    );

  }

  getTimeString(){
    return format(
      Utils.getDateFromTime(this.creneauSelected.start),
      'HH[h]mm',
      {locale: frLocale}
      )
      + "-" +
      format(
        Utils.getDateFromTime(this.creneauSelected.end),
        'HH[h]mm',
        {locale: frLocale}
      )
  }

  reserve() {
    alert("vous avez réservé !");
  }
}
