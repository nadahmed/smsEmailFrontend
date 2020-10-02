import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmseditcontactComponent } from './smseditcontact.component';

describe('SmseditcontactComponent', () => {
  let component: SmseditcontactComponent;
  let fixture: ComponentFixture<SmseditcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmseditcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmseditcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
