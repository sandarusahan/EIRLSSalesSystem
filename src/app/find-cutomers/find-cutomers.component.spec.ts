import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCutomersComponent } from './find-cutomers.component';

describe('FindCutomersComponent', () => {
  let component: FindCutomersComponent;
  let fixture: ComponentFixture<FindCutomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindCutomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCutomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
