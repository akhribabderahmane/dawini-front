import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOComponent } from './header-o.component';

describe('HeaderOComponent', () => {
  let component: HeaderOComponent;
  let fixture: ComponentFixture<HeaderOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderOComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
