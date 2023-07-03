import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio19Component } from './desafio19.component';

describe('Desafio19Component', () => {
  let component: Desafio19Component;
  let fixture: ComponentFixture<Desafio19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio19Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
