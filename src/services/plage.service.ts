import { Injectable } from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';

import {Subject} from 'rxjs';
import {Plage} from '../models/plage';
import {Time} from '../models/time'
import {Module} from '../models/module';
import {File} from '../models/file';

let API = '/api/';

@Injectable({
  providedIn: 'root'
})
export class PlageService {

  private selectedPlage$ = new Subject<Plage>();
  private selectedPlage;


  private url = serverUrl + API + 'plage';
  private httpOptions = httpOptionsBase;

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
    return new Promise<Array<Plage>>(resolve => {
      this.http.get<Array<Plage>>(this.url + '/between-times?'+makeQuerryStartTime(startTime)+'&'+makeQuerryEndTime(endTime), this.httpOptions)
        .subscribe(plages => {
          resolve(plages);
        }, err => {
          console.log(err);
        })
    });
  }
}
