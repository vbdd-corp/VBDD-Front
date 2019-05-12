import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreneauSelectionComponent } from './creneau-selection.component';

describe('CreneauSelectionComponent', () => {
  let component: CreneauSelectionComponent;
  let fixture: ComponentFixture<CreneauSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreneauSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreneauSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
