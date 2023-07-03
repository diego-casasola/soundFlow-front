import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio9Component } from './desafio9.component';

describe('Desafio9Component', () => {
  let component: Desafio9Component;
  let fixture: ComponentFixture<Desafio9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
