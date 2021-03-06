import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBookComponent } from './select-book.component';

describe('SelectBookComponent', () => {
  let component: SelectBookComponent;
  let fixture: ComponentFixture<SelectBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
