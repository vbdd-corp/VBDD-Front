import {Injectable} from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Utils} from '../models/utils';


@Injectable({
  providedIn: 'root'
})
export class DossierService {

  private url = serverUrl + '/api/file/by-studentId/';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  getDossiers() {
    let student1 = Utils.getStudent();
    return this.http.get(this.url + student1.id, this.httpOptions)
      .pipe(map(dossier => {
        return dossier;
      }));
  }
}
