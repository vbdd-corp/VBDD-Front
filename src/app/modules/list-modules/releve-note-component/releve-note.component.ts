import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Utils} from '../../../../models/utils';
import {DownloadService} from '../../../../services/download.service';

const URL = 'http://localhost:9428/api/module/upload/';

@Component({
  selector: 'app-releve-note-component',
  templateUrl: './releve-note.component.html',
  styleUrls: ['./releve-note.component.css']
})
export class ReleveNoteComponent implements OnInit {
  @Input() report: any;
  @Input() module: any;
  isFileUploaded: boolean = false;
  shouldDisplayDownload: boolean = false;

  public uploader: FileUploader;
  @ViewChild('file') selectedPicture: any;

  constructor(private downloadService: DownloadService) {
  }

  ngOnInit() {
    const completeURL = URL + Utils.getUser().id + '/' + this.report.id + '/' + this.module.id;
    if (this.getLink() == null) {
      this.shouldDisplayDownload = true;
    }
    this.uploader = new FileUploader({
      url:
      completeURL,
      itemAlias: 'foo'
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
  }

  public getLink() {
    return this.module.infos.filePath;
  }

  downloadFile() {
    this.downloadService.downloadFile(this.getLink());
  }
  public onSubmit() {

    this.uploader.uploadAll();
    this.isFileUploaded = true;

  }

  deleteFile() {
    this.selectedPicture.nativeElement.value = '';
  }
}
