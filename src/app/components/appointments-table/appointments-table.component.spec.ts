import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentstableComponent } from './appointments-table.component';

describe('AppointmentsTableComponent', () => {
  let component: AppointmentstableComponent;
  let fixture: ComponentFixture<AppointmentstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentstableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
