import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Plage} from '../models/plage';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';
import {Time} from '../models/time';
import {Utils} from '../models/utils';
import {Creneau} from '../models/creneau';
import {AppointmentType} from '../models/appointment-type';

let API = '/api/';

@Injectable({
  providedIn: 'root'
})
export class CreneauService {

  private selectedCreneau$ = new Subject<Creneau>();
  private selectedCreneau;


  private url = serverUrl + API + 'creneau';
  private httpOptions = httpOptionsBase;

  private creneauList: Creneau[] = [];
  public creneaux$: BehaviorSubject<Creneau[]> = new BehaviorSubject(this.creneauList);

  constructor(private http: HttpClient) { }


  setSelectedCreneau(creneau: Creneau) {
    this.selectedCreneau$.next(creneau);
    this.selectedCreneau = creneau;
  }

  getSelectedCreneau() {
    return this.selectedCreneau$.asObservable();
  }

  getCreneauxByBri(briId: number) {
    this.http.get<Creneau[]>(this.url + '/by-bri/' + briId, this.httpOptions)
      .subscribe(creneaux => {
        this.creneaux$.next(creneaux);
        this.creneauList = creneaux;
      }, err => {
        console.log(err);
      });
  }

  getCreneaux() {
    this.http.get<Creneau[]>(this.url + '/', this.httpOptions)
      .subscribe(creneaux => {
        this.creneaux$.next(creneaux);
        this.creneauList = creneaux;
      }, err => {
        console.log(err);
      });
  }

  getCreneauxByAppointmentType(appointmentTypeId: number) {
    this.http.get<Creneau[]>(this.url + '/by-appointmentType/'+appointmentTypeId, this.httpOptions)
      .subscribe(creneaux => {
        this.creneaux$.next(creneaux);
        this.creneauList = creneaux;
      }, err => {
        console.log(err);
      });
  }
}
