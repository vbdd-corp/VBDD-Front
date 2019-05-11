import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentType} from '../../../models/appointment-type';
import {AppointmentService} from '../../../services/appointment.service';
import {Subscription} from 'rxjs';
import {CreneauService} from '../../../services/creneau.service';

@Component({
  selector: 'app-prise-rdv-side',
  templateUrl: './prise-rdv-side.component.html',
  styleUrls: ['./prise-rdv-side.component.css']
})
export class PriseRdvSideComponent implements OnInit, OnDestroy {

  appointmentTypes :AppointmentType[] = [];
  appointmentTypeSelected: AppointmentType;

  subAppointmentService :Subscription;

  constructor(private appointmentService : AppointmentService,private creneauService: CreneauService) {
    this.subAppointmentService = appointmentService.appointmentTypes$.subscribe( appointmentTypes => {
      this.appointmentTypes = appointmentTypes;
      if(appointmentTypes){
        this.appointmentTypeSelected = appointmentTypes[0];
      }
    });
    appointmentService.getAppointmentTypes();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subAppointmentService.unsubscribe();
  }

  selectAppointmentType(appointmentType: AppointmentType) {
    this.appointmentTypeSelected = appointmentType;
    this.creneauService.getCreneauxByAppointmentType(appointmentType.id);
  }

}
