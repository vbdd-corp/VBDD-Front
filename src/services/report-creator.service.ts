import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {httpOptionsBase, serverUrl} from '../config/server.config';
import {Utils} from '../models/utils';

@Injectable({
  providedIn: 'root'
})

export class ReportCreatorService {

  private url = serverUrl + '/api/file/';
  private httpOptions = httpOptionsBase;
  private user = Utils.getStudent();// JSON.parse(localStorage.getItem('User')).student[0];

  constructor(private http: HttpClient) {
  }

  create(fileTypeId: number, reportName: string) {
    return this.http.post<any>(this.url + this.user.id, {fileTypeId, reportName}, this.httpOptions)
      .pipe(map(user => {
        return user;
      }));
  }
}
