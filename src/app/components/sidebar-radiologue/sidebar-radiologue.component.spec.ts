import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRadiologueComponent } from './sidebar-radiologue.component';

describe('SidebarComponent', () => {
  let component: SidebarRadiologueComponent;
  let fixture: ComponentFixture<SidebarRadiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarRadiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarRadiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
