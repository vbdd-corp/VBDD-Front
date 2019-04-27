import {Component, Input, OnInit} from '@angular/core';
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

  public uploader: FileUploader;

  constructor() {
  }

  ngOnInit() {
  }

  public onSubmit() {

    const completeURL = URL + Utils.getStudent().id + '/' + this.report.id + '/' + ModuleComponent.getModuleId(this.report.modules, 4);
    this.uploader = new FileUploader({
      url:
      completeURL,
      itemAlias: 'europass'
    });


    this.uploader.uploadAll();

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };
  }


}
