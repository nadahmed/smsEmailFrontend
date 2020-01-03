import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTranxComponent } from './recent-tranx.component';

describe('RecentTranxComponent', () => {
  let component: RecentTranxComponent;
  let fixture: ComponentFixture<RecentTranxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentTranxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTranxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
