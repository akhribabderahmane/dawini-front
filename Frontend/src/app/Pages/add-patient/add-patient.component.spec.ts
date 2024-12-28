import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientpage} from './add-patient.component';

describe('AddPatientComponent', () => {
  let component: AddPatientpage;
  let fixture: ComponentFixture<AddPatientpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPatientpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPatientpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
