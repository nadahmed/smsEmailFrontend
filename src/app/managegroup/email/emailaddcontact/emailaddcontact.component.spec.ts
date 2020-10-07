import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailaddcontactComponent } from './emailaddcontact.component';

describe('SmsaddcontactComponent', () => {
  let component: EmailaddcontactComponent;
  let fixture: ComponentFixture<EmailaddcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailaddcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailaddcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
