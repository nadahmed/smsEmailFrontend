import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeremailgroupComponent } from './customeremailgroup.component';

describe('CustomeremailgroupComponent', () => {
  let component: CustomeremailgroupComponent;
  let fixture: ComponentFixture<CustomeremailgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeremailgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeremailgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
