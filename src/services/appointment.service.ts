import { Injectable } from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';
import {AppointmentType} from '../models/appointment-type';
import {BehaviorSubject} from 'rxjs';
import {ModuleType} from '../models/moduleType';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private url = serverUrl + "/api/" + 'appointment';
  private httpOptions = httpOptionsBase;


  private appointmentTypeList: AppointmentType[];
  public appointmentTypes$: BehaviorSubject<AppointmentType[]> = new BehaviorSubject(this.appointmentTypeList);

  constructor(private http: HttpClient) { }

  getAppointmentTypes() {
    this.http.get<AppointmentType[]>(serverUrl + "/api/" + 'appointmentTypes/', this.httpOptions)
      .subscribe((moduleTypes: AppointmentType[]) => {
        this.appointmentTypes$.next(moduleTypes);
        this.appointmentTypeList = moduleTypes;
      });
  }
}
