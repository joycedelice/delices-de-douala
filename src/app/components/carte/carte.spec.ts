import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteComponent } from './carte';

describe('Carte', () => {
  let component: CarteComponent;
  let fixture: ComponentFixture<CarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
