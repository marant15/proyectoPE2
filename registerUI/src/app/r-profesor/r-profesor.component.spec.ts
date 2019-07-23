import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RProfesorComponent } from './r-profesor.component';

describe('RProfesorComponent', () => {
  let component: RProfesorComponent;
  let fixture: ComponentFixture<RProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
