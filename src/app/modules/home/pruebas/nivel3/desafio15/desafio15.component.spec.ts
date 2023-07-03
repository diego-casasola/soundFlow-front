import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio15Component } from './desafio15.component';

describe('Desafio15Component', () => {
  let component: Desafio15Component;
  let fixture: ComponentFixture<Desafio15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio15Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
