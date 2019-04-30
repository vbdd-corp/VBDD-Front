import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Utils} from '../../../../models/utils';
import {ModuleComponent} from '../../module-component';


const URL = 'http://localhost:9428/api/module/upload/';

@Component({
  selector: 'app-europass-component',
  templateUrl: './europass.component.html',
  styleUrls: ['./europass.component.css']
})

export class EuropassComponent implements OnInit {

  @Input() report: any;
  isFileUploaded: boolean = false;

  public uploader: FileUploader;
  @ViewChild('file') selectedPicture: any;

  constructor() {

  }

  ngOnInit() {
    const completeURL = URL + Utils.getUser().id + '/' + this.report.id + '/' + ModuleComponent.getModuleId(this.report.modules, 4);

    this.uploader = new FileUploader({
      url:
      completeURL,
      itemAlias: 'foo'
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

  }

  public onSubmit() {

    this.uploader.uploadAll();
    this.isFileUploaded = true;

  }

  deleteFile() {
    this.selectedPicture.nativeElement.value = '';
  }
}
