import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lettre-motivation',
  templateUrl: './lettre-motivation.component.html',
  styleUrls: ['./lettre-motivation.component.css']
})
export class LettreMotivationComponent implements OnInit {
  @Input() report: any;

  constructor() { }

  ngOnInit() {
  }

}
