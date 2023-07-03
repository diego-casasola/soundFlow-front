import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio17Component } from './desafio17.component';

describe('Desafio17Component', () => {
  let component: Desafio17Component;
  let fixture: ComponentFixture<Desafio17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio17Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
