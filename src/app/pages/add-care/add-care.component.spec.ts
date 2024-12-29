import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarepage } from './add-care.component';

describe('AddCareComponent', () => {
  let component: AddCarepage;
  let fixture: ComponentFixture<AddCarepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCarepage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarepage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
