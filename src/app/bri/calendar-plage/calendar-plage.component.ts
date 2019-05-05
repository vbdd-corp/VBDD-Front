import {Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy} from '@angular/core';
import {CalendarEvent, CalendarDateFormatter, CalendarView, DAYS_OF_WEEK, CalendarEventAction} from 'angular-calendar';
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
export class CalendarPlageComponent implements OnInit, OnDestroy{

  events: CalendarEvent<Plage>[] = [];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-times pull-right"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deletePlage(event.meta);
      }
    }
  ];

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  sub :Subscription;
  plages :Plage[];

  refresh: Subject<any> = new Subject();

  plageToCalendarEvent(plage: Plage) :CalendarEvent<Plage>{
    return {
      start: Utils.getDateFromTime(plage.start),
      end: Utils.getDateFromTime(plage.end),
      title: '',
      actions: this.actions,
      meta: plage
    }
  }

  constructor(private plageService :PlageService) {
    this.sub = plageService.plages$.subscribe( plages => {
      this.events = [];
      plages.forEach( plage => {
        this.events.push(this.plageToCalendarEvent(plage));
      });
      this.refresh.next();
    })
  }

  ngOnInit() {

    // const start = Utils.getTimeFromDate(startOfWeek(this.viewDate, {weekStartsOn: DAYS_OF_WEEK.MONDAY}));
    // const end = Utils.getTimeFromDate(endOfWeek(this.viewDate, { weekStartsOn: DAYS_OF_WEEK.MONDAY}));

    this.plageService.getPlages();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  select(event: CalendarEvent<Plage>) {
    this.plageService.setSelectedPlage(event.meta);
  }

  private deletePlage(plage: Plage) {
    this.plageService.removePlage(plage.id);
  }
}
