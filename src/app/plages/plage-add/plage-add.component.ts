import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlageService} from '../../../services/plage.service';
import {Plage} from '../../../models/plage';
import {Subscription} from 'rxjs';
import {AppointmentType} from '../../../models/appointment-type';
import {AppointmentService} from '../../../services/appointment.service';
import {TimepickerConfig} from 'ngx-bootstrap';

export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    showMeridian: false,
    mousewheel: true,
    arrowkeys: true
  });
}

@Component({
  selector: 'app-plage-add',
  templateUrl: './plage-add.component.html',
  styleUrls: ['./plage-add.component.css'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
export class PlageAddComponent implements OnInit, OnDestroy {

  subAppointmentService :Subscription;

  startTime: Date;
  endTime: Date;
  minTime: Date;
  maxTime: Date;

  appointmentTypes :AppointmentType[] = [];
  appointmentTypeSelected: AppointmentType;

  constructor(private plageService: PlageService,private appointmentService: AppointmentService) {
    this.subAppointmentService = appointmentService.appointmentTypes$.subscribe( appointmentTypes => {
      this.appointmentTypes = appointmentTypes;
      if(appointmentTypes){
        this.appointmentTypeSelected = appointmentTypes[0];
      }
    });
    appointmentService.getAppointmentTypes();

    //set min and max
    this.minTime = new Date();
    this.minTime.setHours(8);
    this.minTime.setMinutes(0);
    this.maxTime = new Date();
    this.maxTime.setHours(18);
    this.maxTime.setMinutes(0);
    this.startTime = this.minTime;
    this.endTime = this.maxTime;
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.subAppointmentService.unsubscribe();
  }

  selectAppointmentType(appointmentType: AppointmentType) {
    this.appointmentTypeSelected = appointmentType;
  }

}
