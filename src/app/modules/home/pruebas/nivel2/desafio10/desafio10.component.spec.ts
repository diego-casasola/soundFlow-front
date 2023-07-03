import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio10Component } from './desafio10.component';

describe('Desafio10Component', () => {
  let component: Desafio10Component;
  let fixture: ComponentFixture<Desafio10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
