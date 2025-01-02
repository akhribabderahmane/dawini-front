import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterOComponent } from './footer-o.component';

describe('FooterOComponent', () => {
  let component: FooterOComponent;
  let fixture: ComponentFixture<FooterOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterOComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
