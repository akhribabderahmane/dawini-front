import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDoctorComponent } from './exam-doctor.component';

describe('ExamDoctorComponent', () => {
  let component: ExamDoctorComponent;
  let fixture: ComponentFixture<ExamDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
