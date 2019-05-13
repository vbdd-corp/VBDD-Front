import {Component, OnDestroy, OnInit} from '@angular/core';
import {CalendarEvent, CalendarDateFormatter, CalendarView, DAYS_OF_WEEK, CalendarEventAction} from 'angular-calendar';
import {CustomDateFormatter} from '../../../services/custom-date-formatter.service';
import {Creneau} from '../../../models/creneau';
import {Subject, Subscription} from 'rxjs';
import {Utils} from '../../../models/utils';
import {CreneauService} from '../../../services/creneau.service';
import {AppointmentService} from '../../../services/appointment.service';
import {Appointment} from '../../../models/appointment';

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
export class CalendarCreneauStudentComponent implements OnInit, OnDestroy {

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
      secondary: '#fde31e'
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

  subCreneauService :Subscription;
  subAppointmentService :Subscription;
  creneaux :Creneau[];

  selectedEvent :CalendarEvent;
  selectedEventPreviousColor :any;

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
      });
      appointmentService.getAppointmentsOfActualStudentUser();
      this.refresh.next();
    });

    this.subAppointmentService = this.appointmentService.appointments$.subscribe( appointments => {
      this.events.forEach( event => {
        let hasBeenMarqued = false;
        appointments.forEach( appointment => {
          if(appointment.creneau.id === event.meta.id){
            event.color = this.colors.yellow;
            hasBeenMarqued = true;
          }
          else if(!hasBeenMarqued){
            event.color = this.colors.blue;
          }
        })
      });
      this.refresh.next();
    });
  }

  ngOnInit() {
    this.creneauService.getCreneaux();
  }

  ngOnDestroy(): void {
    this.subCreneauService.unsubscribe();
    this.subAppointmentService.unsubscribe();
  }

  select(event: CalendarEvent<Creneau>) {

    this.creneauService.setSelectedCreneau(event.meta);


    /*this.selectedEventPreviousColor = event.color;
    event.color = this.colors.green;

    //if the event selected is not the former selected event.
    if(this.selectedEvent && this.selectedEvent !== event){
      this.selectedEvent.color = this.selectedEventPreviousColor;
    }*/

    this.selectedEvent = event;
  }

}
