import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Utils} from '../../../../models/utils';
import {DownloadService} from '../../../../services/download.service';

const URL = 'http://localhost:9428/api/module/upload/';

@Component({
  selector: 'app-lettre-motivation',
  templateUrl: './lettre-motivation.component.html',
  styleUrls: ['./lettre-motivation.component.css']
})
export class LettreMotivationComponent implements OnInit, OnChanges {
  @Input() file: any;
  @Input() module: any;
  isFileUploaded: boolean = false;

  shouldDisplayDownload: boolean = false;

  public uploader: FileUploader;
  @ViewChild('file') selectedPicture: any;

  constructor(private downloadService: DownloadService) {
  }

  public getLink() {
    return this.module.infos.filePath;
  }

  getNameFileUploaded() {
    const link = this.getLink().split('\\');
    return link[link.length-1];
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
    }
  }

  public onSubmit() {
    this.uploader.uploadAll();
    this.isFileUploaded = true;
  }

  deleteFile() {
    this.selectedPicture.nativeElement.value = '';
  }
}
