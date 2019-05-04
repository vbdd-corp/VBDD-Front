import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {httpOptionsBase, serverUrl} from '../config/server.config';
import {HttpClient} from '@angular/common/http';
import {Student} from '../models/student';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentList: Student[] = [];
  private url = serverUrl + '/api/';
  private httpOptions = httpOptionsBase;

  public students$: BehaviorSubject<Student[]> = new BehaviorSubject(this.studentList);

  constructor(private http: HttpClient) {
  }

  /* A TESTER*/
  getStudent() {
    this.http.get<Student[]>(this.url + 'students', this.httpOptions)
      .subscribe((students: Student[]) => {
        this.students$.next(students);
        this.studentList = students;
      });
  }

  getReportsByName(studentName: string) {

    return this.http.get(this.url + 'file/by-name/?name=' + studentName, this.httpOptions)
      .pipe(map(dossiers => {
        return dossiers;
      }));
  }

  updateStudent(student: Student) {
    const urlWithId = this.url + 'students/' + student.id;
    this.http.put<Student>(urlWithId, student, this.httpOptions)
      .subscribe((_student) => console.log('updated => ', _student), (error) => console.log(error));
  }
}
