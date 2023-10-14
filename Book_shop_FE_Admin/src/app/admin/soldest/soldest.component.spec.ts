import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldestComponent } from './soldest.component';

describe('SoldestComponent', () => {
  let component: SoldestComponent;
  let fixture: ComponentFixture<SoldestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
