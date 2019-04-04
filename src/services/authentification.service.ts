import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {StudentSingleton} from '../models/studentSingleton';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) {
  }

  login(mail: string, password: string) {
    return this.http.post<any>('/users/authenticate', {mail, password})
      .pipe(map(user => {
        if (user && user.token) {
          StudentSingleton.getInstance().feedUserFromJson(JSON.stringify(user));
        }
        return user;
      }));
  }


}
