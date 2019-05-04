import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityBriComponent } from './availability-bri.component';

describe('AvailabilityBriComponent', () => {
  let component: AvailabilityBriComponent;
  let fixture: ComponentFixture<AvailabilityBriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilityBriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityBriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
