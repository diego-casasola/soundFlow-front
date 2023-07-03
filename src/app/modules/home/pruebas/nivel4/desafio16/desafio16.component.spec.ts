import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio16Component } from './desafio16.component';

describe('Desafio16Component', () => {
  let component: Desafio16Component;
  let fixture: ComponentFixture<Desafio16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio16Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
