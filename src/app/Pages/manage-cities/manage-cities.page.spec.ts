import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageCitiesPage } from './manage-cities.page';

describe('ManageCitiesPage', () => {
  let component: ManageCitiesPage;
  let fixture: ComponentFixture<ManageCitiesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
