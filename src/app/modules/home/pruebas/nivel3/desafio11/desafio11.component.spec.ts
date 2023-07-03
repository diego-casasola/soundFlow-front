import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio11Component } from './desafio11.component';

describe('Desafio11Component', () => {
  let component: Desafio11Component;
  let fixture: ComponentFixture<Desafio11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
