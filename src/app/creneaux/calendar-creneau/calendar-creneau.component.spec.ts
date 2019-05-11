import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCreneauComponent } from './calendar-creneau.component';

describe('CalendarCreneauComponent', () => {
  let component: CalendarCreneauComponent;
  let fixture: ComponentFixture<CalendarCreneauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarCreneauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCreneauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
