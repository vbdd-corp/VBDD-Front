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


  private url = serverUrl + API;
  private httpOptions = httpOptionsBase;

  private selectedModule$ = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getModules(reportId: number) {

    return this.http.get<any>(this.url +'file/'+reportId, this.httpOptions);
  }

  setSelectedModule(module: any) {
    this.selectedModule$.next(module);
  }

  getSelectedModule() {
    return this.selectedModule$.asObservable();
  }

}
