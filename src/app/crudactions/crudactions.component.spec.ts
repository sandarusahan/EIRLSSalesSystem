import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudactionsComponent } from './crudactions.component';

describe('CrudactionsComponent', () => {
  let component: CrudactionsComponent;
  let fixture: ComponentFixture<CrudactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
