import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page2RadiologueComponent } from './page2-radiologue.component';

describe('Page2RadiologueComponent', () => {
  let component: Page2RadiologueComponent;
  let fixture: ComponentFixture<Page2RadiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page2RadiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page2RadiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
