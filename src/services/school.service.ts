import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';
import { Student } from '../models/student';
import {BehaviorSubject} from "rxjs";
import {School} from "../models/school";
import {Module} from "../models/module";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private schoolList: School[] = [];
  private url = serverUrl + '/api/';
  private httpOptions = httpOptionsBase;

  public schools$: BehaviorSubject<School[]> = new BehaviorSubject(this.schoolList);

  constructor(private http: HttpClient) {
  }

  getSchoolById(id: number) {
    const urlWithId = this.url + 'school/' + id;
    this.http.get<School>(urlWithId)
      .subscribe((school: School) => {});
  }

  getSchool() {
    this.http.get<School[]>(this.url + 'school', this.httpOptions)
      .subscribe((schools: School[]) => {
        this.schools$.next(schools);
        this.schoolList = schools;
        console.log('schoolList == ', this.schoolList);
      });
  }
}
