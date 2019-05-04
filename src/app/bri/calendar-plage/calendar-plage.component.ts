import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';

@Component({
  selector: 'app-calendar-plage',
  templateUrl: './calendar-plage.component.html',
  styleUrls: ['./calendar-plage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPlageComponent {

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 8),
      end: addHours(startOfDay(new Date()), 10),
      title: 'Event 1',
      // color: colors.red,
    },
    {
      start: addHours(startOfDay(new Date()), 13),
      end: addHours(startOfDay(new Date()), 15),
      title: 'Event 3',
      // color: colors.blue,
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
