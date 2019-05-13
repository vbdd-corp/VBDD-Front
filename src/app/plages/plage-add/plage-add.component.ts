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
    console.log('day => ', this.plagesAddForm.controls.day.value); //!\ prendre que jour mois année
    console.log('start => ', this.plagesAddForm.controls.startTime.value); //!\ prendre que heures et minutes
    console.log('end => ',this.plagesAddForm.controls.endTime.value); //!\ prendre que heures et minutes
    console.log('appointmentType => ', this.appointmentTypeSelected);

    let plageToSend= {
      start: null,
      end: null,
      briId: null,
      appointmentTypeId: this.appointmentTypeSelected.id
    };
    //console.log('plageToSend => ', plageToSend);

  }

}
