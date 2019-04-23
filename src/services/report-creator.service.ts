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
  private user = Utils.getStudent();

  constructor(private http: HttpClient) {
  }

  create(fileTypeId: number, name: string) {
    return this.http.post<any>(this.url, {studentId: this.user.id, fileTypeId, name: name}, this.httpOptions)
      .pipe(map(values => {
        return values;
      }));
  }

  updateModule(moduleId: number, infos: string) {
    return this.http.put('/module/' + moduleId, {infos}, this.httpOptions)
      .pipe(map(values => {
        return values;
      }));
  }
}
