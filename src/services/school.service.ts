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

  private tempSchool: School = null;
  private school1: School = null;
  private school2: School = null;
  private school3: School = null;
  private schoolList: School[] = [];
  private url = serverUrl + '/api/';
  private httpOptions = httpOptionsBase;

  // pour contrat-etudes
  public tempSchool$: BehaviorSubject<School> = new BehaviorSubject(this.tempSchool);
  public school1$: BehaviorSubject<School> = new BehaviorSubject(this.school1);
  public school2$: BehaviorSubject<School> = new BehaviorSubject(this.school2);
  public school3$: BehaviorSubject<School> = new BehaviorSubject(this.school3);

  public schools$: BehaviorSubject<School[]> = new BehaviorSubject(this.schoolList);

  constructor(private http: HttpClient) {
  }

  setSpecificSchool(obj) {
    this.tempSchool$.next(obj);
    this.tempSchool = obj;
  }

  getSelectedTempSchool() {
    return this.tempSchool$.asObservable();
  }

  getSpecificSchoolById(id: number){
      const urlWithId = this.url + 'school/' + id;
      this.http.get(urlWithId)
        .subscribe((school: School) => {
          this.tempSchool$.next(school);
          this.tempSchool = school;
        });
  }

  getSchoolById(id: number, schoolNumber: number) {
    const urlWithId = this.url + 'school/' + id;
      this.http.get(urlWithId)
        .subscribe((school: School) => {
          switch (schoolNumber) {
            case 1:
              this.school1$.next(school);
              this.school1 = school;
              break;
            case 2:
              this.school2$.next(school);
              this.school2 = school;
              break;
            case 3:
              this.school3$.next(school);
              this.school3 = school;
              break;
          }
        });
  }


  getSchool() {
    this.http.get<School[]>(this.url + 'school', this.httpOptions)
      .subscribe((schools: School[]) => {
        this.schools$.next(schools);
        this.schoolList = schools;

      });
  }
}
