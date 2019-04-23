import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettreMotivationEditComponent } from './lettre-motivation-edit.component';

describe('LettreMotivationEditComponent', () => {
  let component: LettreMotivationEditComponent;
  let fixture: ComponentFixture<LettreMotivationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettreMotivationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettreMotivationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
