import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialsmsgroupComponent } from './officialsmsgroup.component';

describe('OfficialsmsgroupComponent', () => {
  let component: OfficialsmsgroupComponent;
  let fixture: ComponentFixture<OfficialsmsgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialsmsgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialsmsgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
