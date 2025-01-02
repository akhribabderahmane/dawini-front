import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisDoctorComponent } from './diagnosis-doctor.component';

describe('DiagnosisDoctorComponent', () => {
  let component: DiagnosisDoctorComponent;
  let fixture: ComponentFixture<DiagnosisDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosisDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosisDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
