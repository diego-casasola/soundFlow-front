import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio13Component } from './desafio13.component';

describe('Desafio13Component', () => {
  let component: Desafio13Component;
  let fixture: ComponentFixture<Desafio13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
