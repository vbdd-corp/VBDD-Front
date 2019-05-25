import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cni',
  templateUrl: './cni.component.html',
  styleUrls: ['./cni.component.css']
})
export class CniComponent implements OnInit {
  @Input() module: any;

  constructor() { }

  ngOnInit() {
  }

  // TODO: create the logic of upload and download (done in another module already)
}
