import {Injectable} from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

let API = '/api/';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {


  private url = serverUrl + API + '/module';
  private httpOptions = httpOptionsBase;

  private selectedModule$ = new Subject<any>();
  private selectedModule;

  constructor(private http: HttpClient) {
  }

  setSelectedModule(module: any) {
    this.selectedModule$.next(module);
    this.selectedModule = module;
  }

  getSelectedModule() {
    return this.selectedModule$.asObservable();
  }

  deleteModule(moduleId: number) {
    this.http.delete<any>(this.url + '/' + moduleId, this.httpOptions)
      .subscribe( () => {
        if (this.selectedModule.id === moduleId){
          this.setSelectedModule(null);
        }
      }, err => {
        console.log(err);
      });
  }
}
