import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-report',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewReportComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    alert(3);
  }

}
