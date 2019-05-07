import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-espace-bri',
  templateUrl: './espace-bri.component.html',
  styleUrls: ['./espace-bri.component.css']
})
export class EspaceBriComponent implements OnInit {
  activeTab = 'search';
  constructor() {
  }

  search(activeTab){
    this.activeTab = activeTab;
  }

  result(activeTab){
    this.activeTab = activeTab;
  }

  ngOnInit() {
  }

}
