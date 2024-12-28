import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationDetailspage } from './consultation-details-page.component';

describe('ConsultationDetailsComponent', () => {
  let component: ConsultationDetailspage;
  let fixture: ComponentFixture<ConsultationDetailspage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationDetailspage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationDetailspage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
