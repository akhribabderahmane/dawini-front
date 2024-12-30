import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationRadiologueComponent } from './observation-radiologue.component';

describe('ObservationRadiologueComponent', () => {
  let component: ObservationRadiologueComponent;
  let fixture: ComponentFixture<ObservationRadiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservationRadiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationRadiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
