import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerComponent } from './admin-customer.component';

describe('AdminCustomerComponent', () => {
  let component: AdminCustomerComponent;
  let fixture: ComponentFixture<AdminCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
