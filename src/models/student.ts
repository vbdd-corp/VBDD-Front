export class Student {
  INE: number;
  address: string;
  birthDate: string;
  city: string;
  firstName: string;
  gender: string;
  id: number;
  lastName: string;
  mail: string;
  major: string;
  mobilePhoneNumber: string;
  nationality: string;
  password: string;
  phoneNumber: string;
  postalCode: string;
  studentNumber: string;

  constructor(json: string) {
    const parsed = JSON.parse(json).student[0];
    this.INE = parsed.INE;
    this.city = parsed.city;
    this.address = parsed.address;
    this.birthDate = parsed.birthDate;
    this.gender = parsed.gender;
    this.id = parsed.id;
    this.major = parsed.major;
    this.mail = parsed.mail;
    this.mobilePhoneNumber = parsed.mobilePhoneNumber;
    this.nationality = parsed.nationality;
    this.password = parsed.password;
    this.phoneNumber = parsed.phoneNumber;
    this.postalCode = parsed.postalCode;
    this.studentNumber = parsed.studentNumber;
    this.firstName = parsed.firstName;
    this.lastName = parsed.lastName;

  }
}
