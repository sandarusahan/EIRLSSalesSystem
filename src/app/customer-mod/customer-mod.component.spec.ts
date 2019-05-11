import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerModComponent } from './customer-mod.component';

describe('CustomerModComponent', () => {
  let component: CustomerModComponent;
  let fixture: ComponentFixture<CustomerModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
