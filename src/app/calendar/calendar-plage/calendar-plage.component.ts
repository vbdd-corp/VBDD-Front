import {Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy} from '@angular/core';
import {CalendarEvent, CalendarDateFormatter, CalendarView, DAYS_OF_WEEK, CalendarEventAction} from 'angular-calendar';
import { CustomDateFormatter} from '../../../services/custom-date-formatter.service';
import { PlageService } from '../../../services/plage.service';
import {Subject, Subscription} from 'rxjs';
import {Utils} from '../../../models/utils';
import {Plage} from '../../../models/plage';

@Component({
  selector: 'app-calendar-plage',
  templateUrl: '../calendar.component.html',
  styleUrls: ['../calendar.component.css'],
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

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    },
    green: {
      primary: '#1ca70d',
      secondary: '#e0fd72'
    }
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-times pull-right"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        if (confirm("Supprimer cette plage ?")){
          this.deletePlage(event.meta);
        }
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
  selectedEvent :CalendarEvent;

  refresh: Subject<any> = new Subject();

  plageToCalendarEvent(plage: Plage) :CalendarEvent<Plage>{
    return {
      start: Utils.getDateFromTime(plage.start),
      end: Utils.getDateFromTime(plage.end),
      title: '',
      color: this.colors.blue,
      actions: this.actions,
      meta: plage
    }
  }

  constructor(private plageService :PlageService) {
    this.sub = plageService.plages$.subscribe( plages => {
      this.events = [];
      plages.forEach( plage => {
        const event = this.plageToCalendarEvent(plage);
        this.events.push(event);
        if(this.selectedEvent && (this.selectedEvent.meta.id === plage.id)){
          this.select(event);
        }
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
    event.color = this.colors.green;

    //if the event selected is not the former selected event.
    if(this.selectedEvent && this.selectedEvent !== event){
      this.selectedEvent.color = this.colors.blue;
    }

    this.selectedEvent = event;
  }

  private deletePlage(plage: Plage) {
    this.plageService.removePlage(plage.id);
  }
}
