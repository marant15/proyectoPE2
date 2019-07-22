import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAsigComponent } from './select-asig.component';

describe('SelectAsigComponent', () => {
  let component: SelectAsigComponent;
  let fixture: ComponentFixture<SelectAsigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAsigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAsigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
