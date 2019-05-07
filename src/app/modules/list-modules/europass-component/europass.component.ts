import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Utils} from '../../../../models/utils';
import {httpOptionsBase} from '../../../../config/server.config';
import {DownloadService} from '../../../../services/download.service';


const URL = 'http://localhost:9428/api/module/upload/';

@Component({
  selector: 'app-europass-component',
  templateUrl: './europass.component.html',
  styleUrls: ['./europass.component.css']
})

export class EuropassComponent implements OnInit {

  @Input()
  module: any;
  @Input()
  report: any;
  public completeURL: string;

  isFileUploaded: boolean = false;

  public uploader: FileUploader;
  @ViewChild('file') selectedPicture: any;
  shouldDisplayDownload: boolean = false;
  private httpOptions = httpOptionsBase;

  constructor(private downloadService: DownloadService) {
  }

  ngOnInit() {

    this.completeURL = URL + Utils.getUser().id + '/' + this.report.id + '/' + this.module.id;
    this.uploader = new FileUploader({
      url:
      this.completeURL,
      itemAlias: 'foo'
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    if (this.getLink() == '') {
      this.shouldDisplayDownload = true;
    }
  }

  public onSubmit() {

    this.uploader.uploadAll();
    this.isFileUploaded = true;

  }

  public getLink() {
    return this.module.infos.filePath;
  }

  deleteFile() {
    this.selectedPicture.nativeElement.value = '';
  }

  downloadFile() {
    this.downloadService.downloadFile(this.downloadService.getFile(this.getLink()));
  }
}
