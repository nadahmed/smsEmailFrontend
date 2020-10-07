import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailbulkuploadComponent } from './emailbulkupload.component';

describe('EmailbulkuploadComponent', () => {
  let component: EmailbulkuploadComponent;
  let fixture: ComponentFixture<EmailbulkuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailbulkuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailbulkuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
