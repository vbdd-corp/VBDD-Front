import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CniComponent } from './cni.component';

describe('CniComponent', () => {
  let component: CniComponent;
  let fixture: ComponentFixture<CniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
