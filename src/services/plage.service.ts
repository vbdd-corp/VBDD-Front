import { Injectable } from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Subject} from 'rxjs';
import {Plage} from '../models/plage';
import {Time} from '../models/time'
import {Module} from '../models/module';
import {File} from '../models/file';
import {Utils} from '../models/utils';

let API = '/api/';

@Injectable({
  providedIn: 'root'
})
export class PlageService {

  private selectedPlage$ = new Subject<Plage>();
  private selectedPlage;


  private url = serverUrl + API + 'plage';
  private httpOptions = httpOptionsBase;

  private plageList: Plage[] = [];
  public plages$: BehaviorSubject<Plage[]> = new BehaviorSubject(this.plageList);

  constructor(private http: HttpClient) { }


  setSelectedPlage(plage: Plage) {
    this.selectedPlage$.next(plage);
    this.selectedPlage = plage;
  }

  getSelectedPlage() {
    return this.selectedPlage$.asObservable();
  }

  getPlagesBetween(startTime :Time, endTime :Time) {
    function makeQuerryStartTime(time: Time) {
      return `sMinute=${time.minute}&sHour=${time.hour}&sDay=${time.day}&sMonth=${time.month}&sYear=${time.year}`;
    }

    function makeQuerryEndTime(time: Time) {
      return `eMinute=${time.minute}&eHour=${time.hour}&eDay=${time.day}&eMonth=${time.month}&eYear=${time.year}`;
    }

    // TODO: get for only the briId of current user
    this.http.get<Array<Plage>>(this.url + '/between-times?'+makeQuerryStartTime(startTime)+'&'+makeQuerryEndTime(endTime), this.httpOptions)
      .subscribe(plages => {
        this.plageList = plages;
        this.plages$.next(plages);
      }, err => {
        console.log(err);
      });
  }

  getPlages() {
    this.http.get<Plage[]>(this.url + '/by-bri/' + Utils.getUser().id, this.httpOptions)
      .subscribe(plages => {
        this.plages$.next(plages);
        this.plageList = plages;
      }, err => {
        console.log(err);
      });
  }

  removePlage(id: number) {
    this.http.delete(this.url + '/' + id, this.httpOptions)
      .subscribe( () => {
        this.getPlages();
      }, err => {
        console.log(err);
      });
  }

  updatePlage(plageId :number,plage :Plage) {
    return new Promise<Plage>(resolve => {
      this.http.put<Plage>(this.url + '/' + plageId, plage, this.httpOptions)
        .subscribe(plage => {
          this.getPlages();
          resolve(plage);
        }, err => {
          console.log(err);
        })
    });
  }

}
