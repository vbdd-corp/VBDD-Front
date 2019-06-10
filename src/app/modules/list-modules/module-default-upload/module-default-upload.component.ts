import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Utils} from '../../../../models/utils';
import {DownloadService} from '../../../../services/download.service';
import {Module} from '../../../../models/module';
import {File} from '../../../../models/file';
import {selectValueAccessor} from '@angular/forms/src/directives/shared';

const URL = 'http://localhost:9428/api/module/upload/';

@Component({
  selector: 'app-module-default-upload',
  templateUrl: './module-default-upload.component.html',
  styleUrls: ['./module-default-upload.component.css']
})
export class ModuleDefaultUploadComponent implements OnInit, OnChanges {
  @Input() file: File;
  @Input() module: Module;
  isFileUploaded: boolean = false;

  shouldDisplayDownload: boolean = false;

  public uploader: FileUploader;
  @ViewChild('file') selectedPicture: any;

  constructor(private downloadService: DownloadService) {
  }

  public getLink() {
    return this.module.infos.filePath;
  }

  downloadFile() {
    this.downloadService.downloadFile(this.getLink());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.modules)
      this.module = changes.module.currentValue;
    this.ngOnInit();
  }

  ngOnInit() {
    const completeURL = URL + Utils.getUser().id + '/' + this.file.id + '/' + this.module.id;
    this.uploader = new FileUploader({
      url:
      completeURL,
      itemAlias: 'foo'
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    if (this.getLink() == null) {
      this.shouldDisplayDownload = true;
      this.selectedPicture.nativeElement.value = 'avdqsvdsqv';
    }
  }

  public onSubmit() {
    this.uploader.uploadAll();
    this.isFileUploaded = true;
  }

  deleteFile() {
    this.selectedPicture.nativeElement.value = '';
  }

  getNameFileUploaded() {
    const link = this.getLink().split('\\');
    return link[link.length-1];
  }
}
