import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsaddcontactComponent } from './smsaddcontact.component';

describe('SmsaddcontactComponent', () => {
  let component: SmsaddcontactComponent;
  let fixture: ComponentFixture<SmsaddcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsaddcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsaddcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
