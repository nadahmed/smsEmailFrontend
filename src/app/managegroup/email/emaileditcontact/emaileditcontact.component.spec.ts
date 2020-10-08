import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmaileditcontactComponent } from './emaileditcontact.component';

describe('EmaileditcontactComponent', () => {
  let component: EmaileditcontactComponent;
  let fixture: ComponentFixture<EmaileditcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmaileditcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmaileditcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
