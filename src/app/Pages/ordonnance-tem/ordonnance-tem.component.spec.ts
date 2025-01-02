import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnanceTemComponent } from './ordonnance-tem.component';

describe('OrdonnanceTemComponent', () => {
  let component: OrdonnanceTemComponent;
  let fixture: ComponentFixture<OrdonnanceTemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdonnanceTemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnanceTemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
