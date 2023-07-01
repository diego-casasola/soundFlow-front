import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNivelComponent } from './card-nivel.component';

describe('CardNivelComponent', () => {
  let component: CardNivelComponent;
  let fixture: ComponentFixture<CardNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardNivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
