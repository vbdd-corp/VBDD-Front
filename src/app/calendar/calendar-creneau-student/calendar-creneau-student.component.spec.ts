import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCreneauStudentComponent } from './calendar-creneau-student.component';

describe('CalendarCreneauStudentComponent', () => {
  let component: CalendarCreneauStudentComponent;
  let fixture: ComponentFixture<CalendarCreneauStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarCreneauStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCreneauStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
