import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {httpOptionsBase, serverUrl} from '../config/server.config';
import {Utils} from '../models/utils';

@Injectable({
  providedIn: 'root'
})

export class ReportCreatorService {

  private url = serverUrl + '/api/';
  private httpOptions = httpOptionsBase;
  private user = Utils.getUser();

  constructor(private http: HttpClient) {
  }

  create(fileTypeId: number, name: string) {
    return this.http.post<any>(this.url + 'file/', {studentId: this.user.id, fileTypeId, name: name}, this.httpOptions)
      .pipe(map(reportWithModule => {
        return reportWithModule;
      }));
  }

  updateModule(moduleId: number, infos: any) {
    return this.http.put(this.url + 'module/' + moduleId, {infos}, this.httpOptions)
      .pipe(map(values => {
        return values;
      }));
  }
}
