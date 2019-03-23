import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */



  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  error(): void {
    console.log('There is an error to fix!');
  }

  getMessage(): string {
    return 'ERROR!';
  }

}

