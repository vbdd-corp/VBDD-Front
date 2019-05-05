import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import { CalendarEvent, CalendarDateFormatter, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import {subDays , addDays, addHours, startOfDay, startOfWeek, endOfWeek} from 'date-fns';
import { CustomDateFormatter} from '../../../services/custom-date-formatter.service';
import { PlageService } from '../../../services/plage.service';
import {Subject, Subscription} from 'rxjs';
import {Utils} from '../../../models/utils';
import {Plage} from '../../../models/plage';

@Component({
  selector: 'app-calendar-plage',
  templateUrl: './calendar-plage.component.html',
  styleUrls: ['./calendar-plage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarPlageComponent {

  events: CalendarEvent[] = [];

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  sub :Subscription;
  plages :Plage[];

  refresh: Subject<any> = new Subject();

  static plageToCalendarEvent(plage: Plage) :CalendarEvent{
    return {
      start: Utils.getDateFromTime(plage.start),
      end: Utils.getDateFromTime(plage.end),
      title: '',
    }
  }

  constructor(private plageService :PlageService) {
  }

  ngOnInit() {

    const start = Utils.getTimeFromDate(startOfWeek(this.viewDate, {weekStartsOn: DAYS_OF_WEEK.MONDAY}));
    const end = Utils.getTimeFromDate(endOfWeek(this.viewDate, { weekStartsOn: DAYS_OF_WEEK.MONDAY}));

    this.plageService.getPlagesBetween(start, end)
      .then( plages => {
        this.plages = plages;
        plages.forEach( plage => {
          this.events.push(CalendarPlageComponent.plageToCalendarEvent(plage));
        });
        this.refresh.next();
      });
  }

}
