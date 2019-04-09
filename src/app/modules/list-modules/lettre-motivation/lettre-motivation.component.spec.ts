import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettreMotivationComponent } from './lettre-motivation.component';

describe('LettreMotivationComponent', () => {
  let component: LettreMotivationComponent;
  let fixture: ComponentFixture<LettreMotivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettreMotivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettreMotivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
