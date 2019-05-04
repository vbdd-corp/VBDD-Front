import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoeuxUniversitesComponent } from './voeux-universites.component';

describe('VoeuxUniversitesComponent', () => {
  let component: VoeuxUniversitesComponent;
  let fixture: ComponentFixture<VoeuxUniversitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoeuxUniversitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoeuxUniversitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
