import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnancePageComponent } from './ordonnance-page.component';

describe('OrdonnancePageComponent', () => {
  let component: OrdonnancePageComponent;
  let fixture: ComponentFixture<OrdonnancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdonnancePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
