import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlageService} from '../../../services/plage.service';
import {Plage} from '../../../models/plage';
import {Subscription} from 'rxjs';
import {Utils} from '../../../models/utils';
import {format} from 'date-fns';
const frLocale = require('date-fns/locale/fr');
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import {AppointmentType} from '../../../models/appointment-type';
import {ModuleType} from '../../../models/moduleType';
import {AppointmentService} from '../../../services/appointment.service';

export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    showMeridian: false,
    mousewheel: true,
    arrowkeys: true
  });
}

@Component({
  selector: 'app-plage-edit',
  templateUrl: './plage-edit.component.html',
  styleUrls: ['./plage-edit.component.css'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
export class PlageEditComponent implements OnInit, OnDestroy {

  selectedPlage :Plage;
  subPlageService :Subscription;
  subAppointmentService :Subscription;

  startTime: Date;
  endTime: Date;
  minTime: Date;
  maxTime: Date ;

  appointmentTypes :AppointmentType[] = [];
  appointmentTypeSelected: AppointmentType;


  constructor(private plageService: PlageService,private appointmentService: AppointmentService) {
    this.subPlageService = plageService.getSelectedPlage().subscribe( plage => {
      this.selectedPlage = plage;
      this.startTime = Utils.getDateFromTime(this.selectedPlage.start);
      this.endTime = Utils.getDateFromTime(this.selectedPlage.end);


      //set min and max, within the day selected
      this.minTime = new Date(this.startTime.getTime());
      this.minTime.setHours(8);
      this.minTime.setMinutes(0);
      this.maxTime = new Date(this.startTime.getTime());
      this.maxTime.setHours(18);
      this.maxTime.setMinutes(0);

      this.appointmentTypeSelected = plage.appointmentType;
    });

    this.subAppointmentService = appointmentService.appointmentTypes$.subscribe( appointmentTypes => {
      this.appointmentTypes = appointmentTypes;
    });
    appointmentService.getAppointmentTypes();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subAppointmentService.unsubscribe();
    this.subPlageService.unsubscribe();
  }

  getDayString(){
    return format(
      Utils.getDateFromTime(this.selectedPlage.start),
      'dddd D MMMM',
      {locale: frLocale}
    );

  }

  getTimeString(){
    return format(
      Utils.getDateFromTime(this.selectedPlage.start),
      'HH[h]mm',
      {locale: frLocale}
      )
      + "-" +
      format(
        Utils.getDateFromTime(this.selectedPlage.end),
        'HH[h]mm',
        {locale: frLocale}
      )
  }

  selectAppointmentType(appointmentType: AppointmentType) {
    this.appointmentTypeSelected = appointmentType;
  }

  submit(){
    this.plageService.updatePlage(this.selectedPlage.id, {
      start: Utils.getTimeFromDate(this.startTime),
      end: Utils.getTimeFromDate(this.endTime),
      appointmentTypeId: this.appointmentTypeSelected.id
    });
  }
}
