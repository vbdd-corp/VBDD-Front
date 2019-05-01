import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratEtudeComponent } from './contrat-etude.component';

describe('ContratEtudeComponent', () => {
  let component: ContratEtudeComponent;
  let fixture: ComponentFixture<ContratEtudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratEtudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratEtudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
