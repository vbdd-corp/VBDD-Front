import { Injectable } from '@angular/core';
import {Module} from '../models/module';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlageService {

  private selectedPlage$ = new Subject<any>();
  private selectedPlage;

  constructor() { }


  setSelectedPlage(plage: any) {
    this.selectedPlage$.next(plage);
    this.selectedPlage = plage;
  }

  getSelectedPlage() {
    return this.selectedPlage$.asObservable();
  }

}
