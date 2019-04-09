import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosGeneralesComponent } from './infos-generales.component';

describe('InfosGeneralesComponent', () => {
  let component: InfosGeneralesComponent;
  let fixture: ComponentFixture<InfosGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
