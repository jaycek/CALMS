import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbillEditComponent } from './ebill-edit.component';

describe('EbillEditComponent', () => {
  let component: EbillEditComponent;
  let fixture: ComponentFixture<EbillEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbillEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
