import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlageService} from '../../../services/plage.service';
import {Plage} from '../../../models/plage';
import {Subscription} from 'rxjs';
import {Utils} from '../../../models/utils';

@Component({
  selector: 'app-plage-edit',
  templateUrl: './plage-edit.component.html',
  styleUrls: ['./plage-edit.component.css']
})
export class PlageEditComponent implements OnInit, OnDestroy {

  selectedPlage :Plage;
  sub :Subscription;

  constructor(plageService: PlageService) {
    this.sub = plageService.getSelectedPlage().subscribe( plage => {
      this.selectedPlage = plage;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getDayString(plage :Plage){
    const date = Utils.getDateFromTime(plage.start);
    return date.toDateString();
  }

}
