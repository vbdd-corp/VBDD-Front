export class Student {

  constructor() {

  }


  private _isStudent: boolean;

  get isStudent(): boolean {
    return this._isStudent;
  }

  set isStudent(value: boolean) {
    this._isStudent = value;
  }

  private _INE: number;

  get INE(): number {
    return this._INE;
  }

  set INE(value: number) {
    this._INE = value;
  }

  private _address: string;

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  private _birthDate: string;

  get birthDate(): string {
    return this._birthDate;
  }

  set birthDate(value: string) {
    this._birthDate = value;
  }

  private _city: string;

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  private _firstName: string;

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  private _gender: string;

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  private _id: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  private _lastName: string;

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  private _mail: string;

  get mail(): string {
    return this._mail;
  }

  set mail(value: string) {
    this._mail = value;
  }

  private _major: string;

  get major(): string {
    return this._major;
  }

  set major(value: string) {
    this._major = value;
  }

  private _mobilePhoneNumber: string;

  get mobilePhoneNumber(): string {
    return this._mobilePhoneNumber;
  }

  set mobilePhoneNumber(value: string) {
    this._mobilePhoneNumber = value;
  }

  private _nationality: string;

  get nationality(): string {
    return this._nationality;
  }

  set nationality(value: string) {
    this._nationality = value;
  }

  private _password: string;

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  private _phoneNumber: string;

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  private _postalCode: string;

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }

  private _studentNumber: string;

  get studentNumber(): string {
    return this._studentNumber;
  }

  set studentNumber(value: string) {
    this._studentNumber = value;
  }


  public feedUserFromJson(json: string) {
    let parse = JSON.parse(json);
    const parsed = parse.student[0];
    this._INE = parsed.INE;
    this._city = parsed.city;
    this._address = parsed.address;
    this._birthDate = parsed.birthDate;
    this._gender = parsed.gender;
    this._id = parsed.id;
    this._major = parsed.major;
    this._mail = parsed.mail;
    this._mobilePhoneNumber = parsed.mobilePhoneNumber;
    this._nationality = parsed.nationality;
    this._password = parsed.password;
    this._phoneNumber = parsed.phoneNumber;
    this._postalCode = parsed.postalCode;
    this._studentNumber = parsed.studentNumber;
    this._firstName = parsed.firstName;
    this._lastName = parsed.lastName;
    this._isStudent = parse.isStudent;
  }
}
