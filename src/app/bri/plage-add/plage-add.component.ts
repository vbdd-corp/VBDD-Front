import { Component, OnInit } from '@angular/core';
import {PlageService} from '../../../services/plage.service';

@Component({
  selector: 'app-plage-add',
  templateUrl: './plage-add.component.html',
  styleUrls: ['./plage-add.component.css']
})
export class PlageAddComponent implements OnInit {

  constructor(plageService :PlageService) { }

  ngOnInit() {
  }

}
