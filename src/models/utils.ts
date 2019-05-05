import {Time} from './time';

export class Utils {

  constructor() {
  }

  static getUser() {
    if (JSON.parse(localStorage.getItem('User')).student) {
      return JSON.parse(localStorage.getItem('User')).student[0];
    } else {
      return JSON.parse(localStorage.getItem('User')).bri[0];
    }
  }

  static setStudent(user){
    var x = JSON.parse(localStorage.getItem("User"));
    x.student = [];
    x.student.push(user);
    localStorage.setItem("User", JSON.stringify(x));
  }

  static isStudent() {
    return JSON.parse(localStorage.getItem('User')).isStudent;
  }

  static getDateFromTime(time :Time) :Date {
    const date = new Date();
    date.setFullYear(time.year, time.month-1, time.day);
    date.setHours(time.hour, time.minute);
    return date;
  }

  static getTimeFromDate(date :Date) :Time {
    return {
      minute: date.getMinutes(),
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth()+1,
      year: date.getFullYear()
    }
  }
}
