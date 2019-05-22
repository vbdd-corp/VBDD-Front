import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';
import { Student } from '../models/student';
import {BehaviorSubject} from "rxjs";
import {School} from "../models/school";
import {Module} from "../models/module";
import {Plage} from '../models/plage';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private schoolList: School[] = [];
  private url = serverUrl + '/api/school';
  private httpOptions = httpOptionsBase;

  public schools$: BehaviorSubject<School[]> = new BehaviorSubject(this.schoolList);

  constructor(private http: HttpClient) {
  }


  getSchoolById(id: number) {
    return new Promise<School>(resolve => {
      this.http.get<School>(this.url + '/'+id, this.httpOptions)
        .subscribe(school => {
          resolve(school);
        }, err => {
          console.log(err);
        })
    });
  }




  getSchool() {
    this.http.get<School[]>(this.url + '/', this.httpOptions)
      .subscribe((schools: School[]) => {
        this.schools$.next(schools);
        this.schoolList = schools;

      });
  }
}
