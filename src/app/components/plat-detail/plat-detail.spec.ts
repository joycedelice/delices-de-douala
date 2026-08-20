import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatDetail } from './plat-detail';

describe('PlatDetail', () => {
  let component: PlatDetail;
  let fixture: ComponentFixture<PlatDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
