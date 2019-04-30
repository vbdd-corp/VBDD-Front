import {Injectable} from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Utils} from '../models/utils';


@Injectable({
  providedIn: 'root'
})
export class DossierService {

  private url = serverUrl + '/api/file/';
  private httpOptions = httpOptionsBase;


  constructor(private http: HttpClient) {
  }

  getDossiers() {
    let student1 = Utils.getUser();
    return this.http.get(this.url + 'by-studentId/' + student1.id, this.httpOptions)
      .pipe(map(dossier => {
        return dossier;
      }));
  }

  removeDossier(id: number) {
    return this.http.delete(this.url + id, this.httpOptions)
      .pipe(map(dossier => {
        return dossier;
      }));
  }

  getDossier(id: number) {
    return this.http.get(this.url+id, this.httpOptions);
  }
}
