import { Component, OnInit } from '@angular/core';
import {CalendarEvent, CalendarDateFormatter, CalendarView, DAYS_OF_WEEK, CalendarEventAction} from 'angular-calendar';
import {CustomDateFormatter} from '../../../services/custom-date-formatter.service';
import {Creneau} from '../../../models/creneau';
import {Subject, Subscription} from 'rxjs';
import {Utils} from '../../../models/utils';
import {CreneauService} from '../../../services/creneau.service';

@Component({
  selector: 'app-calendar-creneau-student',
  templateUrl: '../calendar.component.html',
  styleUrls: ['../calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarCreneauStudentComponent implements OnInit {

  events: CalendarEvent<Creneau>[] = [];

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

  ];

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  sub :Subscription;
  creneaux :Creneau[];
  selectedEvent :CalendarEvent;

  refresh: Subject<any> = new Subject();

  creneauToCalendarEvent(creneau: Creneau) :CalendarEvent<Creneau>{
    return {
      start: Utils.getDateFromTime(creneau.start),
      end: Utils.getDateFromTime(creneau.end),
      title: '',
      color: this.colors.blue,
      actions: this.actions,
      meta: creneau
    }
  }

  constructor(private creneauService :CreneauService) {
    this.sub = creneauService.creneaux$.subscribe( creneaux => {
      this.events = [];
      creneaux.forEach( creneau => {
        const event = this.creneauToCalendarEvent(creneau);
        this.events.push(event);
        if(this.selectedEvent && (this.selectedEvent.meta.id === creneau.id)){
          this.select(event);
        }
      });
      this.refresh.next();
    })
  }

  ngOnInit() {

    this.creneauService.getCreneaux();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  select(event: CalendarEvent<Creneau>) {

    this.creneauService.setSelectedCreneau(event.meta);
    event.color = this.colors.green;

    //if the event selected is not the former selected event.
    if(this.selectedEvent && this.selectedEvent !== event){
      this.selectedEvent.color = this.colors.blue;
    }

    this.selectedEvent = event;
  }

}
