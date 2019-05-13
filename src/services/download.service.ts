import {Injectable} from '@angular/core';
import {serverUrl} from '../config/server.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {


  constructor(private http: HttpClient) {
  }

  public downloadFile(link) {
    this.downloadReport(link).subscribe(
      data => saveAs(data, link),
      err => console.error(err)
    );
  }

  private downloadReport(link): Observable<any> {
    return this.http.post(
      serverUrl + '/api/module/download',
      {filePath: link}, {
        responseType: 'blob',
        headers: new HttpHeaders().append(
          'Content-Type', 'application/json')
      });
  }
}
