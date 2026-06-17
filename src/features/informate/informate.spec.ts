import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Informate } from './informate';

describe('Informate', () => {
  let component: Informate;
  let fixture: ComponentFixture<Informate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Informate],
    }).compileComponents();

    fixture = TestBed.createComponent(Informate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
