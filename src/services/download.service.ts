import {Injectable} from '@angular/core';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  getFile(link): any {

    return this.http.post(serverUrl + '/api/module/download', {filePath: link}, this.httpOptions)
      .map((response: Response) => response.json());
  }

  public downloadFile(response) {
    const blob = new Blob([response], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

}
