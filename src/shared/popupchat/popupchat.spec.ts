import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChat } from './popupchat';

describe('Popupchat', () => {
  let component: PopupChat;
  let fixture: ComponentFixture<PopupChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupChat],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupChat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
