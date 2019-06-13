import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCourierComponent } from './find-courier.component';

describe('FindCourierComponent', () => {
  let component: FindCourierComponent;
  let fixture: ComponentFixture<FindCourierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindCourierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
