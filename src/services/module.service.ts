import {Injectable} from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {File} from '../models/file';
import {Utils} from '../models/utils';
import {School} from '../models/school';
import {Module} from '../models/module';
import {ModuleType} from '../models/moduleType';

let API = '/api/';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {


  private url = serverUrl + API + 'module';
  private httpOptions = httpOptionsBase;

  private selectedModule$ = new Subject<Module>();
  private selectedModule;

  private moduleTypeList: ModuleType[] = [];
  public moduleTypes$: BehaviorSubject<ModuleType[]> = new BehaviorSubject(this.moduleTypeList);

  constructor(private http: HttpClient) {
  }

  setSelectedModule(module: Module) {
    this.selectedModule$.next(module);
    this.selectedModule = module;
  }

  getSelectedModule() {
    return this.selectedModule$.asObservable();
  }

  deleteModule(moduleId: number) {
    this.http.delete(this.url + '/' + moduleId, this.httpOptions)
      .subscribe( () => {
        if (this.selectedModule && this.selectedModule.id === moduleId){
          this.setSelectedModule(null);
        }
      }, err => {
        console.log(err);
      });
  }

  createModule(fileId: number,typeModuleId: number, name: string) {
    return new Promise<Module>(resolve => {
      this.http.post<File>(this.url + '/'+fileId, {typeModuleId: typeModuleId}, this.httpOptions)
        .subscribe(module => {
          resolve(module);
        }, err => {
          console.log(err);
        })
    });
  }

  getModuleTypes() {
    this.http.get<ModuleType[]>(serverUrl + API + 'moduleTypes/', this.httpOptions)
      .subscribe((moduleTypes: ModuleType[]) => {
        this.moduleTypes$.next(moduleTypes);
        this.moduleTypeList = moduleTypes;
      });
  }
}
