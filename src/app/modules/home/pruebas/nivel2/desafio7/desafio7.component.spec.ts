import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio7Component } from './desafio7.component';

describe('Desafio7Component', () => {
  let component: Desafio7Component;
  let fixture: ComponentFixture<Desafio7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
