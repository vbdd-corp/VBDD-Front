import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent implements OnInit {
  @Input() report: any;

  constructor() { }

  ngOnInit() {
  }

}
