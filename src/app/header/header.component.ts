import {Component, OnInit} from '@angular/core';
import {StudentSingleton} from '../../models/studentSingleton';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  logOff() {
    StudentSingleton.getInstance().id = null;
  }
}
