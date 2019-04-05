export class Utils {

  constructor() {
  }

  static getStudent() {
    return JSON.parse(localStorage.getItem('User')).student[0];
  }

}
