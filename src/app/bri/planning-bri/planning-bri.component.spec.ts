import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningBriComponent } from './planning-bri.component';

describe('PlanningBriComponent', () => {
  let component: PlanningBriComponent;
  let fixture: ComponentFixture<PlanningBriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningBriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningBriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
