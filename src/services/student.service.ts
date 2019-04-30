import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = serverUrl + '/api/';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  getReportsByName(studentName: string) {

    return this.http.get(this.url + 'file/by-name/' + studentName, this.httpOptions)
      .pipe(map(dossiers => {
        return dossiers;
      }));
  }
}
