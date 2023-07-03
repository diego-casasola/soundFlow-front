import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio14Component } from './desafio14.component';

describe('Desafio14Component', () => {
  let component: Desafio14Component;
  let fixture: ComponentFixture<Desafio14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio14Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
