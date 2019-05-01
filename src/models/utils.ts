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
}
