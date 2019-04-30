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

  static isStudent() {
    return JSON.parse(localStorage.getItem('User')).isStudent;
  }
}
