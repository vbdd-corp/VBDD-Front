import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';
import { Student } from '../models/student';
import {BehaviorSubject} from "rxjs";
import {School} from "../models/school";

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

  getSchool() {
    this.http.get<School[]>(this.url + 'school', this.httpOptions)
      .subscribe((schools: School[]) => {
        this.schools$.next(schools);
        this.schoolList = schools;
      });
  }
}
