import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextappoinementComponent } from './nextappoinement.component';

describe('NextappoinementComponent', () => {
  let component: NextappoinementComponent;
  let fixture: ComponentFixture<NextappoinementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextappoinementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextappoinementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
