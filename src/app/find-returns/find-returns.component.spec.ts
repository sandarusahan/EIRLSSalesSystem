import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindReturnsComponent } from './find-returns.component';

describe('FindReturnsComponent', () => {
  let component: FindReturnsComponent;
  let fixture: ComponentFixture<FindReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
