import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDefaultUploadComponent } from './module-default-upload.component';

describe('ModuleDefaultUploadComponent', () => {
  let component: ModuleDefaultUploadComponent;
  let fixture: ComponentFixture<ModuleDefaultUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleDefaultUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleDefaultUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
