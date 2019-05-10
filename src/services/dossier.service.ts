import {Injectable} from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {File} from '../models/file';
import {HttpClient} from '@angular/common/http';
import {Utils} from '../models/utils';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  private url = serverUrl + '/api/file/';
  private httpOptions = httpOptionsBase;


  private fileList: File[] = [];
  public files$: BehaviorSubject<any[]> = new BehaviorSubject(this.fileList);


  constructor(private http: HttpClient) {
  }

  getAllFiles() {
    this.http.get<any>(this.url, this.httpOptions)
      .subscribe(files => {
        this.files$.next(files);
      }, err => {
        console.log(err);
      });
  }

  getDossiers() {
    this.http.get<any>(this.url + 'by-studentId/' + Utils.getUser().id, this.httpOptions)
      .subscribe(files => {
        this.files$.next(files);
        this.fileList = files;
      }, err => {
        console.log(err);
      });
  }

  removeDossier(id: number) {
    this.http.delete(this.url + id, this.httpOptions)
      .subscribe(file => {
        this.getDossiers();
      }, err => {
        console.log(err);
      });
  }

  getDossier(id: number) {
    return new Promise<any>(resolve => {
      this.http.get(this.url + id, this.httpOptions).subscribe(data => {
          resolve(data);
        },
        err => {
          console.log(err);
        });
    });
  }

  create(fileTypeId: number, name: string) {
    return new Promise<File>(resolve => {
      this.http.post<File>(this.url, {studentId: Utils.getUser().id, fileTypeId: fileTypeId, name: name}, this.httpOptions)
        .subscribe(file => {
          this.getDossiers();
          resolve(file);
        }, err => {
          console.log(err);
        });
    });
  }

  updateFileName(id: number, name: string) {
    this.http.put(this.url + id, {name: name}, this.httpOptions)
      .subscribe(() => {
        this.getDossiers();
      }, err => {
        console.log(err);
      });
  }

  validateReport(actualReportId: number) {

    let notValidated: boolean = false;
    this.http.put(this.url + actualReportId, {isValidated: true}, this.httpOptions)
      .subscribe(() => {
        notValidated = true;
      }, err => {
        console.log(err);
        notValidated = false;
      });
    return notValidated;
  }

  isAlreadyValidated(actualReportId: number) {
    let toReturn: boolean = false;
    this.getDossier(actualReportId).then(report => toReturn = report);
    return toReturn;
  }
}
