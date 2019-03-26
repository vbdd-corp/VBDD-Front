import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStdComponent } from './home.component';

describe('HomeStdComponent', () => {
  let component: HomeStdComponent;
  let fixture: ComponentFixture<HomeStdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
