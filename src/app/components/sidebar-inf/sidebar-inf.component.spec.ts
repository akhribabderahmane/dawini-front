import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarInfComponent } from './sidebar-inf.component';

describe('SidebarInfComponent', () => {
  let component: SidebarInfComponent;
  let fixture: ComponentFixture<SidebarInfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarInfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
