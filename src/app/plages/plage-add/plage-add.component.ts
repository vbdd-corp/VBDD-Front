import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlageService} from '../../../services/plage.service';
import {Plage} from '../../../models/plage';
import {Subscription} from 'rxjs';
import {AppointmentType} from '../../../models/appointment-type';
import {AppointmentService} from '../../../services/appointment.service';
import {BsLocaleService, TimepickerConfig} from 'ngx-bootstrap';

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
  plagesAddForm: FormGroup;

  startTime: Date;
  endTime: Date;
  minTime: Date;
  maxTime: Date;
  locale = 'fr';

  appointmentTypes :AppointmentType[] = [];
  appointmentTypeSelected: AppointmentType;

  constructor(private plageService: PlageService,
              private appointmentService: AppointmentService,
              private formBuilder: FormBuilder,
              private localeService: BsLocaleService) {
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
    this.localeService.use(this.locale);

    this.plagesAddForm = this.formBuilder.group({
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });

    this.plagesAddForm.get('startTime').setValue(this.startTime);
    this.plagesAddForm.get('endTime').setValue(this.endTime);
    this.plagesAddForm.get('day').setValue(new Date());
  }

  ngOnDestroy(): void {
    this.subAppointmentService.unsubscribe();
  }

  selectAppointmentType(appointmentType: AppointmentType) {
    this.appointmentTypeSelected = appointmentType;
  }


  onSubmit() {

    //HERE YOUR NEEDED VALUES:
    const dayGot = this.plagesAddForm.controls.day.value;
    console.log('day => ', ); //!\ prendre que jour mois année
    let startGot = this.plagesAddForm.controls.startTime.value;
    let start = new Date(
      dayGot.getFullYear(), dayGot.getMonth(),
      dayGot.getDate(), startGot.getHours(), startGot.getMinutes());
    console.log('start => ', start); //!\ prendre que heures et minutes
    //console.log('end => ',); //!\ prendre que heures et minutes
    let endGot = this.plagesAddForm.controls.endTime.value;
    let end = new Date(
      dayGot.getFullYear(), dayGot.getMonth(),
      dayGot.getDate(), endGot.getHours(), endGot.getMinutes());
    console.log('appointmentType => ', end);

    let plageToSend= {
      start: null,
      end: null,
      briId: null,
      appointmentTypeId: this.appointmentTypeSelected.id
    };
    //console.log('plageToSend => ', plageToSend);

  }

}
