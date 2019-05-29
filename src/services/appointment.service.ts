import { Injectable } from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';
import {AppointmentType} from '../models/appointment-type';
import {BehaviorSubject, Subject} from 'rxjs';
import {ModuleType} from '../models/moduleType';
import {Appointment} from '../models/appointment';
import {Utils} from '../models/utils';
import {File} from '../models/file';
import {Creneau} from '../models/creneau';
import {Plage} from '../models/plage';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private url = serverUrl + "/api/" + 'appointment';
  private httpOptions = httpOptionsBase;

  private appointmentSelected$ = new Subject<Appointment>();

  private appointmentTypeList: AppointmentType[];
  public appointmentTypes$: BehaviorSubject<AppointmentType[]> = new BehaviorSubject(this.appointmentTypeList);

  private appointmentList: Appointment[];
  public appointments$: BehaviorSubject<Appointment[]> = new BehaviorSubject(this.appointmentList);

  private appointmentsBriList: Appointment[];
  public appointmentsBri$: BehaviorSubject<Appointment[]> = new BehaviorSubject(this.appointmentsBriList);

  constructor(private http: HttpClient) {

  }

  setSelectedAppointment(appointment: Appointment) {
    this.appointmentSelected$.next(appointment);
  }

  getSelectedAppointment() {
    return this.appointmentSelected$.asObservable();
  }

  getAppointmentTypes() {
    this.http.get<AppointmentType[]>(serverUrl + "/api/" + 'appointmentTypes/', this.httpOptions)
      .subscribe((moduleTypes: AppointmentType[]) => {
        this.appointmentTypes$.next(moduleTypes);
        this.appointmentTypeList = moduleTypes;
      });
  }

  getAppointmentsOfActualUser() {
    if(Utils.isStudent()){
      this.http.get<Appointment[]>(this.url+/by-student/+Utils.getUser().id, this.httpOptions)
        .subscribe( appointments => {
          this.appointmentList = appointments;
          this.appointments$.next(appointments);
        });
    }
    else { // if BRI user
      this.http.get<Appointment[]>(this.url+/by-bri/+Utils.getUser().id, this.httpOptions)
        .subscribe( appointments => {
          this.appointmentsBriList = appointments;
          this.appointmentsBri$.next(appointments);
        });
    }
  }

  getAppointmentsInCreneau(creneauId :number) {
    this.http.get<Appointment[]>(this.url+/by-creneau/+creneauId, this.httpOptions)
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

  cancelAppointment(appointmentId: number) {
    return new Promise<Appointment>(resolve => {
      this.http.put<Appointment>(this.url+'/'+ appointmentId, { appointmentStatusId: 2},this.httpOptions)
        .subscribe(appointment => {
          this.getAppointmentsOfActualUser();
          resolve(appointment);
        }, err => {
          console.log(err);
        });
    });
  }

  updateAppointment(appointment :Appointment) {
    return new Promise<Appointment>(resolve => {
      this.http.put<Appointment>(this.url+'/'+ appointment.id, appointment,this.httpOptions)
        .subscribe(appointment => {
          this.getAppointmentsOfActualUser();
          resolve(appointment);
        }, err => {
          console.log(err);
        });
    });
  }

  getAppointmentsInPlage(plageId: number) {
    return new Promise<Appointment[]>(resolve => {
      this.http.get<Appointment[]>(this.url+'/by-plage/'+ plageId,this.httpOptions)
        .subscribe(appointments => {
          resolve(appointments);
        }, err => {
          console.log(err);
        });
    });
  }
}
