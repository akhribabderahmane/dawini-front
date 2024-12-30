import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLaboratinComponent } from './sidebar-laboratin.component';

describe('SidebarComponent', () => {
  let component: SidebarLaboratinComponent;
  let fixture: ComponentFixture<SidebarLaboratinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarLaboratinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarLaboratinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
