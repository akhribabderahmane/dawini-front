import { ComponentFixture, TestBed } from '@angular/core/testing';

import { importexcelComponent } from './importexcel.component';

describe('importexcelComponent', () => {
  let component: importexcelComponent;
  let fixture: ComponentFixture<importexcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [importexcelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(importexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
