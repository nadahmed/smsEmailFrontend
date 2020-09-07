import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersmsgroupComponent } from './customersmsgroup.component';

describe('CustomersmsgroupComponent', () => {
  let component: CustomersmsgroupComponent;
  let fixture: ComponentFixture<CustomersmsgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersmsgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersmsgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
