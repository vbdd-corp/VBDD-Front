import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {
  }

  login(mail: string, password: string) {
    return this.http.post<any>('/api/login', {mail, password})
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('User', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    console.log('Log-outs');
  }
}
