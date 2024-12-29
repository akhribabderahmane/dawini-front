import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultationTableComponent } from './consultation-table.component';  // Corrected import path

describe('ConsultationTableComponent', () => {
  let component: ConsultationTableComponent;
  let fixture: ComponentFixture<ConsultationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationTableComponent]  // Corrected import path
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
