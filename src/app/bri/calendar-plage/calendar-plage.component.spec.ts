import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPlageComponent } from './calendar-plage.component';

describe('CalendarPlageComponent', () => {
  let component: CalendarPlageComponent;
  let fixture: ComponentFixture<CalendarPlageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarPlageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPlageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
