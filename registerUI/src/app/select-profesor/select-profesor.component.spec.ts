import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProfesorComponent } from './select-profesor.component';

describe('SelectProfesorComponent', () => {
  let component: SelectProfesorComponent;
  let fixture: ComponentFixture<SelectProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
