import {Injectable} from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {


  private url = serverUrl + '/api/fileType/';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  getModules(reportType: number) {

    return this.http.get(this.url + reportType, this.httpOptions)
      .pipe(map(dossier => {
        return dossier;
      }));
  }
}
