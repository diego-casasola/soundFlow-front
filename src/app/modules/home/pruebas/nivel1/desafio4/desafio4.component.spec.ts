import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio4Component } from './desafio4.component';

describe('Desafio4Component', () => {
  let component: Desafio4Component;
  let fixture: ComponentFixture<Desafio4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
