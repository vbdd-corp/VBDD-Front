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


  updateModule(moduleId: number, infos: any) {
    return this.http.put(this.url + 'module/' + moduleId, {infos: infos}, this.httpOptions)
      .pipe(map(values => {
        return values;
      }));
  }
}
