import {Injectable} from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

let API = '/api/';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {


  private url = serverUrl + API;
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  getModules(reportType: number) {

    return this.http.get(this.url + 'fileType/' + reportType, this.httpOptions)
      .pipe(map(dossier => {
        return dossier;
      }));
  }

}
