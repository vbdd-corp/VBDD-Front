import { Component, OnInit } from '@angular/core';
import {CalendarEvent, CalendarDateFormatter, CalendarView, DAYS_OF_WEEK, CalendarEventAction} from 'angular-calendar';
import { CustomDateFormatter} from '../../../services/custom-date-formatter.service';
import {Plage} from '../../../models/plage';
import {Subject, Subscription} from 'rxjs';
import {Utils} from '../../../models/utils';
import {PlageService} from '../../../services/plage.service';
import {Creneau} from '../../../models/creneau';
import {CreneauService} from '../../../services/creneau.service';
import {AppointmentService} from '../../../services/appointment.service';

@Component({
  selector: 'app-calendar-creneau-bri',
  templateUrl: '../calendar.component.html',
  styleUrls: ['../calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarCreneauBriComponent implements OnInit {

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

  actions: CalendarEventAction[] = [];
  rdvIcon :any = {
    label: '<i class="fas fa-user"></i>'
  };

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  subCreneauService :Subscription;
  subAppointmentService :Subscription;

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

  constructor(private creneauService :CreneauService, private appointmentService :AppointmentService) {
    this.subCreneauService = creneauService.creneaux$.subscribe( creneaux => {
      this.events = [];
      creneaux.forEach( creneau => {
        const event = this.creneauToCalendarEvent(creneau);
        this.events.push(event);
        if(this.selectedEvent && (this.selectedEvent.meta.id === creneau.id)){
          this.select(event);
        }
      });
      this.appointmentService.getAppointmentsOfActualBriUser();
      this.refresh.next();
    });

    this.subAppointmentService = appointmentService.appointmentsBri$.subscribe( appointments => {
      if(!appointments) return;
      this.events.forEach( event => {
        event.actions = [];
        appointments
          .filter( appointment => appointment.appointmentStatus.id !== 2)
          .forEach( appointment => {
          if(event.meta.id === appointment.creneau.id){
            event.actions.push(this.rdvIcon);
          }
        })
      })
    });
  }

  ngOnInit() {

    this.creneauService.getCreneauxByBri(Utils.getUser().id);
  }

  ngOnDestroy(): void {
    this.subCreneauService.unsubscribe();
    this.subAppointmentService.unsubscribe();
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
