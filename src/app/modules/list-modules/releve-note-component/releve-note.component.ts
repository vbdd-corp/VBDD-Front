import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-releve-note-component',
  templateUrl: './releve-note.component.html',
  styleUrls: ['./releve-note.component.css']
})
export class ReleveNoteComponent implements OnInit {
  @Input() report: any;

  constructor() {
  }

  ngOnInit() {
  }

}
