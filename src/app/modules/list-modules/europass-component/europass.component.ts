import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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

export class EuropassComponent implements OnInit, OnChanges {

  @Input()
  module: any;
  @Input()
  file: any;
  public completeURL: string;

  isFileUploaded: boolean = false;

  public uploader: FileUploader;
  @ViewChild('file') selectedPicture: any;
  shouldDisplayDownload: boolean = false;

  constructor(private downloadService: DownloadService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.modules)
      this.module = changes.module.currentValue;
    this.ngOnInit();
  }

  ngOnInit() {

    this.completeURL = URL + Utils.getUser().id + '/' + this.file.id + '/' + this.module.id;
    this.uploader = new FileUploader({
      url:
      this.completeURL,
      itemAlias: 'foo'
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    if (this.getLink() == null) {
      this.shouldDisplayDownload = true;
    }
  }

  public onSubmit() {

    this.uploader.uploadAll();
    this.isFileUploaded = true;

  }


  deleteFile() {
    this.selectedPicture.nativeElement.value = '';
  }

  public getLink() {
    return this.module.infos.filePath;
  }

  downloadFile() {
    this.downloadService.downloadFile(this.getLink());
  }
}
