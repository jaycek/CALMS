import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbillsubscribeComponent } from './ebillsubscribe.component';

describe('EbillsubscribeComponent', () => {
  let component: EbillsubscribeComponent;
  let fixture: ComponentFixture<EbillsubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbillsubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbillsubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
