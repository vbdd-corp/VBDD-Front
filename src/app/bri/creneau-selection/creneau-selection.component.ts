import {Component, OnDestroy, OnInit} from '@angular/core';
import {format} from "date-fns";
import {Utils} from '../../../models/utils';
import {Plage} from '../../../models/plage';
import {Subscription} from 'rxjs';
import {Creneau} from '../../../models/creneau';
import {CreneauService} from '../../../services/creneau.service';
import {AppointmentService} from '../../../services/appointment.service';
import {Appointment} from '../../../models/appointment';
const frLocale = require('date-fns/locale/fr');

@Component({
  selector: 'app-creneau-selection',
  templateUrl: './creneau-selection.component.html',
  styleUrls: ['./creneau-selection.component.css']
})
export class CreneauSelectionComponent implements OnInit, OnDestroy {

  selectedCreneau :Creneau;
  subCreneauService :Subscription;
  subAppointmentService :Subscription;
  appointments :Appointment[];

  constructor(private creneauService :CreneauService, private appointmentService :AppointmentService) {
    this.subCreneauService = this.creneauService.getSelectedCreneau().subscribe( creneau => {
      this.selectedCreneau = creneau;
      this.appointmentService.getAppointmentsInCreneau(this.selectedCreneau.id);
    });

    this.subAppointmentService = this.appointmentService.appointments$.subscribe( appointments => {
      if(!appointments)
        return;
      this.appointments = appointments.filter( appointment => {
        return appointment.appointmentStatus.id != 2;
      });
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subCreneauService.unsubscribe();
    this.subAppointmentService.unsubscribe();
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

  cancelAppointment(appointment :Appointment){
    // TODO: replace confirm by a beautiful modal
    if (confirm(`Annuler ce rendez-vous :\n ${ appointment.student.lastName.toUpperCase() } ${ appointment.student.firstName } - ${appointment.appointmentType.name} ?`)){
      this.appointmentService.cancelAppointment(appointment.id);
      this.appointmentService.getAppointmentsInCreneau(this.selectedCreneau.id);
    }
  }

}
