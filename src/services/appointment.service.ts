import { Injectable } from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';
import {AppointmentType} from '../models/appointment-type';
import {BehaviorSubject} from 'rxjs';
import {ModuleType} from '../models/moduleType';
import {Appointment} from '../models/appointment';
import {Utils} from '../models/utils';
import {File} from '../models/file';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private url = serverUrl + "/api/" + 'appointment';
  private httpOptions = httpOptionsBase;


  private appointmentTypeList: AppointmentType[];
  public appointmentTypes$: BehaviorSubject<AppointmentType[]> = new BehaviorSubject(this.appointmentTypeList);

  private appointmentList: Appointment[];
  public appointments$: BehaviorSubject<Appointment[]> = new BehaviorSubject(this.appointmentList);

  constructor(private http: HttpClient) {

  }

  getAppointmentTypes() {
    this.http.get<AppointmentType[]>(serverUrl + "/api/" + 'appointmentTypes/', this.httpOptions)
      .subscribe((moduleTypes: AppointmentType[]) => {
        this.appointmentTypes$.next(moduleTypes);
        this.appointmentTypeList = moduleTypes;
      });
  }

  getAppointmentsOfActualUser() {
    this.http.get<Appointment[]>(this.url+/by-student/+Utils.getUser().id, this.httpOptions)
      .subscribe( appointments => {
        this.appointmentList = appointments;
        this.appointments$.next(appointments);
      });
  }

  createAppointment(appointment: Appointment) {
    return new Promise<Appointment>(resolve => {
      this.http.post<Appointment>(this.url+'/', appointment, this.httpOptions)
        .subscribe(appointment => {
          this.getAppointmentsOfActualUser();
          resolve(appointment);
        }, err => {
          console.log(err);
        });
    });
  }

}
