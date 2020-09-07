import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmseditgroupComponent } from './smseditgroup.component';

describe('SmseditgroupComponent', () => {
  let component: SmseditgroupComponent;
  let fixture: ComponentFixture<SmseditgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmseditgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmseditgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
