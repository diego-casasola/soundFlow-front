import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShownivelComponent } from './shownivel.component';

describe('ShownivelComponent', () => {
  let component: ShownivelComponent;
  let fixture: ComponentFixture<ShownivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShownivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShownivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
