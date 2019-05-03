import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DossierService} from '../../../services/dossier.service';
import { File } from '../../../models/file';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  sub: any;
  file: File;
  onEditedMode: boolean = false;
  inputFileName :string;

  nodeInputFileName: any;

  constructor(private route: ActivatedRoute, private dossierService: DossierService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.dossierService.getDossier(params['id']).then( file => {
        this.file = file;
        this.inputFileName = file.name;
      });
    });
  }


  editFileName() {
    this.nodeInputFileName = document.getElementById('inputFileNameNode'); // TODO: utiliser ViewChild -> undifined after ngAfterViewInit ???
    // this.nodeInputFileName.addEventListener("keyup", this.saveFileName);
    this.nodeInputFileName.classList.remove('no-display');
    this.onEditedMode = !this.onEditedMode;
  }

  saveFileName(event) {
    if (event.type === "click" || event.key === "Enter") {
      // console.log(this.nodeInputFileName); // undefined when this function is entered by keypress, defined when it's a click ???
      // this.nodeInputFileName.removeEventListener("keyup",  this.saveFileName); TODO: fix the undefined when keypress bug
      this.onEditedMode = !this.onEditedMode;
      this.file.name = this.inputFileName;
      this.nodeInputFileName.classList.add('no-display');

      this.dossierService.updateFileName(this.file.id,this.file.name);
    }
  }
}
