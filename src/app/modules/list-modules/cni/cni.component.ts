import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cni',
  templateUrl: './cni.component.html',
  styleUrls: ['./cni.component.css']
})
export class CniComponent implements OnInit {
  @Input() report: any;

  constructor() { }

  ngOnInit() {
  }

}
