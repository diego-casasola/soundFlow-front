import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio8Component } from './desafio8.component';

describe('Desafio8Component', () => {
  let component: Desafio8Component;
  let fixture: ComponentFixture<Desafio8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
