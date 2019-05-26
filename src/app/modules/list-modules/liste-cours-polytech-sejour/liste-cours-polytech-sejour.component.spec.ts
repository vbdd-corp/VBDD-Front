import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCoursPolytechSejourComponent } from './liste-cours-polytech-sejour.component';

describe('ListeCoursPolytechSejourComponent', () => {
  let component: ListeCoursPolytechSejourComponent;
  let fixture: ComponentFixture<ListeCoursPolytechSejourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeCoursPolytechSejourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCoursPolytechSejourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
