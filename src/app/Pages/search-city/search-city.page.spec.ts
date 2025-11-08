import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCityPage } from './search-city.page';

describe('SearchCityPage', () => {
  let component: SearchCityPage;
  let fixture: ComponentFixture<SearchCityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
