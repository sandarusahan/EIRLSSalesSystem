import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindOrdersComponent } from './find-orders.component';

describe('FindOrdersComponent', () => {
  let component: FindOrdersComponent;
  let fixture: ComponentFixture<FindOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
