import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desafio12Component } from './desafio12.component';

describe('Desafio12Component', () => {
  let component: Desafio12Component;
  let fixture: ComponentFixture<Desafio12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Desafio12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Desafio12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
