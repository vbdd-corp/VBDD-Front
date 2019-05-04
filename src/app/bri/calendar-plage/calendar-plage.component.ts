import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarDateFormatter, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import {subDays , addDays, addHours, startOfDay } from 'date-fns';
import { CustomDateFormatter} from '../../../services/custom-date-formatter.service';

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

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: subDays(addHours(startOfDay(new Date()), 8),3),
      end: subDays(addHours(startOfDay(new Date()), 10),3),
      title: 'Event 1',
      // color: colors.red,
    },
    {
      start: subDays(addHours(startOfDay(new Date()), 15),3),
      end: subDays(addHours(startOfDay(new Date()), 17),3),
      title: 'Event 3',
      // color: colors.blue,
    }
  ];

  view: CalendarView = CalendarView.Week;

  locale: string = 'fr';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
  }

  constructor() { }

  ngOnInit() {
  }

}
