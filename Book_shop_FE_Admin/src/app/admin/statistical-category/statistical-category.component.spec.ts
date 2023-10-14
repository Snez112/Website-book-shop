import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalCategoryComponent } from './statistical-category.component';

describe('StatisticalCategoryComponent', () => {
  let component: StatisticalCategoryComponent;
  let fixture: ComponentFixture<StatisticalCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticalCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
