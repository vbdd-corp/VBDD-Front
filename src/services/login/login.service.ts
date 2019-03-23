import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { USERS_MOCKED } from '../../mocks/users.mock';
import { BehaviorSubject } from 'rxjs/index';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */
  private theURL = 'http://localhost:9428/api/users';
  private usersList: User[] = [] = USERS_MOCKED;


  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.usersList);

  constructor( /*private http: HttpClient*/) {
    // this.getUsers();
  }

  /*getUsers(): void {
    this.http.get<User[]>(this.theURL).subscribe((users) => {

      this.usersList = users;
      this.users$.next(this.usersList);
    });
  }*/

  userExist(user: User): boolean {
    let i = 0;
    for (i = 0; i < this.usersList.length; i++) {
      if (user.mailAddress === this.usersList[i].mailAddress
        && user.password === this.usersList[i].password
       ) {
        return true;
       }
    }

    return false;
  }

  login(user: User): boolean {
    return true;
  }

  logout(): void {
    console.log('logout');
  }


}

