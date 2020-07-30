import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabEditComponent } from './lab-edit.component';

describe('LabEditComponent', () => {
  let component: LabEditComponent;
  let fixture: ComponentFixture<LabEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
