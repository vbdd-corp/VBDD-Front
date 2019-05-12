import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
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

  @Output() appointmentTypeSelect = new EventEmitter();

  appointmentTypes :AppointmentType[] = [];
  appointmentTypeSelected: AppointmentType;
  subAppointmentService :Subscription;

  constructor(private appointmentService : AppointmentService,private creneauService: CreneauService) {
    this.subAppointmentService = appointmentService.appointmentTypes$.subscribe( appointmentTypes => {
      this.appointmentTypes = appointmentTypes;
      if(appointmentTypes){
        this.appointmentTypes = appointmentTypes.filter( appointmentType => appointmentType.id >= 0);
        this.selectAppointmentType(this.appointmentTypes[0]);
      }
    });
    appointmentService.getAppointmentTypes();
  }

  onAppointmentTypeSelect(appointmentType: AppointmentType) {
    this.appointmentTypeSelect.emit(appointmentType);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subAppointmentService.unsubscribe();
  }

  selectAppointmentType(appointmentType: AppointmentType) {
    this.appointmentTypeSelected = appointmentType;
    this.onAppointmentTypeSelect(appointmentType);
  }

  getAvgTimeString(){
    if (this.appointmentTypeSelected.avgTime == null){
      return "inconnu";
    }
    return this.appointmentTypeSelected.avgTime+" minutes";
  }

}
