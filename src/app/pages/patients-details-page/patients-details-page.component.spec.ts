import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsDetailspage } from './patients-details.component';

describe('PatientDetailsComponent', () => {
  let component: PatientsDetailspage;
  let fixture: ComponentFixture<PatientsDetailspage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsDetailspage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsDetailspage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
