import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CniEditComponent } from './cni-edit.component';

describe('CniEditComponent', () => {
  let component: CniEditComponent;
  let fixture: ComponentFixture<CniEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CniEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CniEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
