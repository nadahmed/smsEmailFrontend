import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsbulkuploadComponent } from './smsbulkupload.component';

describe('SmsbulkuploadComponent', () => {
  let component: SmsbulkuploadComponent;
  let fixture: ComponentFixture<SmsbulkuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsbulkuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsbulkuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
