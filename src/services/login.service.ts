import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {httpOptionsBase, serverUrl} from '../config/server.config';
import {StudentSingleton} from '../models/studentSingleton';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) {
  }

  private url = serverUrl + '/api/login';

  private httpOptions = httpOptionsBase;


  login(mail: string, password: string) {
    return this.http.post<any>(this.url, {mail, password}, this.httpOptions)
      .pipe(map(user => {
        if (user) {
          StudentSingleton.getInstance().feedUserFromJson(JSON.stringify(user));
        }
        return user;
      }));
  }
}
