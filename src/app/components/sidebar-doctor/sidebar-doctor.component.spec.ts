import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDoctorComponent } from './sidebar-doctor.component';

describe('SidebarDoctorComponent', () => {
  let component: SidebarDoctorComponent;
  let fixture: ComponentFixture<SidebarDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
