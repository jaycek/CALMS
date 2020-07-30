import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabHomeComponent } from './lab-home.component';

describe('LabHomeComponent', () => {
  let component: LabHomeComponent;
  let fixture: ComponentFixture<LabHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
