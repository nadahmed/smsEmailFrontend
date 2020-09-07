import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablegroupsComponent } from './availablegroups.component';

describe('AvailablegroupsComponent', () => {
  let component: AvailablegroupsComponent;
  let fixture: ComponentFixture<AvailablegroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailablegroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablegroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
