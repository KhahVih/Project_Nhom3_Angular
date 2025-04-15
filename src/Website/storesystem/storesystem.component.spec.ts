import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresystemComponent } from './storesystem.component';

describe('StoresystemComponent', () => {
  let component: StoresystemComponent;
  let fixture: ComponentFixture<StoresystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoresystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoresystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
