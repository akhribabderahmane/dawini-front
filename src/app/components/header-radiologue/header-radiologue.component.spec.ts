import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRadiologueComponent } from './header-radiologue.component';

describe('HeaderRadiologueComponent', () => {
  let component: HeaderRadiologueComponent;
  let fixture: ComponentFixture<HeaderRadiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRadiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderRadiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
