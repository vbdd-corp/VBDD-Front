import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeBriComponent} from './home.component';

describe('HomeComponent', () => {
  let component: HomeBriComponent;
  let fixture: ComponentFixture<HomeBriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeBriComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
