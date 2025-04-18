import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImageComponent } from './admin-image.component';

describe('AdminImageComponent', () => {
  let component: AdminImageComponent;
  let fixture: ComponentFixture<AdminImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
