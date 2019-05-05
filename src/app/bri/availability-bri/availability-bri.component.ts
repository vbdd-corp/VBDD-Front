import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarDateFormatter, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import {subDays , addDays, addHours, startOfDay } from 'date-fns';

@Component({
  selector: 'app-availability-bri',
  templateUrl: './availability-bri.component.html',
  styleUrls: ['./availability-bri.component.css']
})
export class AvailabilityBriComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
