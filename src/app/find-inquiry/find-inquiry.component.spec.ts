import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindInquiryComponent } from './find-inquiry.component';

describe('FindInquiryComponent', () => {
  let component: FindInquiryComponent;
  let fixture: ComponentFixture<FindInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
