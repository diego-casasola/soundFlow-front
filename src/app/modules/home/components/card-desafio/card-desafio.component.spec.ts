import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDesafioComponent } from './card-desafio.component';

describe('CardDesafioComponent', () => {
  let component: CardDesafioComponent;
  let fixture: ComponentFixture<CardDesafioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDesafioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDesafioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
