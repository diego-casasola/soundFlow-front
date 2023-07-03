import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio6Component } from './desafio6.component';

describe('Desafio6Component', () => {
  let component: Desafio6Component;
  let fixture: ComponentFixture<Desafio6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
