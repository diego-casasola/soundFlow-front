import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio18Component } from './desafio18.component';

describe('Desafio18Component', () => {
  let component: Desafio18Component;
  let fixture: ComponentFixture<Desafio18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio18Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
