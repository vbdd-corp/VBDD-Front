import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AppointmentType} from '../../../models/appointment-type';
import {Creneau} from '../../../models/creneau';
import {CreneauService} from '../../../services/creneau.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
const frLocale = require('date-fns/locale/fr');
import {Subscription} from 'rxjs';
import {format} from "date-fns";
import {Utils} from '../../../models/utils';
import { EventEmitter } from '@angular/core';
import {AppointmentService} from '../../../services/appointment.service';
import {Appointment} from '../../../models/appointment';
import {Time} from '../../../models/time';


@Component({
  selector: 'app-prise-rdv',
  templateUrl: './prise-rdv.component.html',
  styleUrls: ['./prise-rdv.component.css']
})
export class PriseRdvComponent implements OnInit, OnDestroy {

  appointmentTypeSelected : AppointmentType;
  modalRef: BsModalRef;

  creneauSelected: Creneau;
  creneauServiceSub: Subscription;

  appointmentSelected: Appointment;
  appointmentServiceSub: Subscription;

  @ViewChild('reservation') reservation: TemplateRef<any>;
  @ViewChild('reserving') reserving: TemplateRef<any>;

  constructor(private creneauService: CreneauService,private appointmentService: AppointmentService,private modalService: BsModalService) {
    this.creneauServiceSub = creneauService.getSelectedCreneau().subscribe( creneau => {
      if( creneau ) {
        this.creneauSelected = creneau;
        this.appointmentSelected = undefined;
        this.openModal(this.reserving);
      }
    });
    this.appointmentServiceSub = appointmentService.getSelectedAppointment().subscribe( appointment => {
      if( appointment ) {
        this.appointmentSelected = appointment;
        this.creneauSelected = appointment.creneau;
        this.openModal(this.reservation);
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.creneauServiceSub.unsubscribe();
    this.appointmentServiceSub.unsubscribe();
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

  getDayString(time :Time){
    return format(
      Utils.getDateFromTime(time),
      'dddd D MMMM',
      {locale: frLocale}
    );

  }

  getPeriodString(start :Time, end :Time){
    return format(
      Utils.getDateFromTime(start),
      'HH[h]mm',
      {locale: frLocale}
      )
      + "-" +
      format(
        Utils.getDateFromTime(end),
        'HH[h]mm',
        {locale: frLocale}
      )
  }

  reserve() {
    const appointment :Appointment = {
      appointmentTypeId: this.appointmentTypeSelected.id,
      appointmentStatusId: 1,
      creneauId: this.creneauSelected.id,
      studentId: Utils.getUser().id,
      briId: this.creneauSelected.briId
    };
    this.appointmentService.createAppointment(appointment);
    alert("vous avez réservé !");
    this.closeModal();
  }

  reserveAgain(appointment : Appointment) {
    const appointmentUpdated :Appointment = {
      appointmentTypeId: this.appointmentTypeSelected.id,
      appointmentStatusId: 1,
      creneauId: appointment.creneau.id,
      studentId: Utils.getUser().id,
      briId: appointment.briId,
      id: appointment.id
    };
    this.appointmentService.updateAppointment(appointmentUpdated);
    alert("vous avez réservé !");
    this.closeModal();
  }

  cancel(appointment: Appointment) {
    this.appointmentService.cancelAppointment(appointment.id);
    alert("Réservation annulée !");
    this.closeModal();
  }
}
