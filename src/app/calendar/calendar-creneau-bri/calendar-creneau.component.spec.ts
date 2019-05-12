import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCreneauBriComponent } from './calendar-creneau-bri.component';

describe('CalendarCreneauComponent', () => {
  let component: CalendarCreneauBriComponent;
  let fixture: ComponentFixture<CalendarCreneauBriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarCreneauBriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCreneauBriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
