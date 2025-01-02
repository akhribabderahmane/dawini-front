import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarePageComponent } from './add-care-page.component';

describe('AddCarePageComponent', () => {
  let component: AddCarePageComponent;
  let fixture: ComponentFixture<AddCarePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCarePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
