import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialemailgroupComponent } from './officialemailgroup.component';

describe('OfficialemailgroupComponent', () => {
  let component: OfficialemailgroupComponent;
  let fixture: ComponentFixture<OfficialemailgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialemailgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialemailgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
