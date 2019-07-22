import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAsigComponent } from './edit-asig.component';

describe('EditAsigComponent', () => {
  let component: EditAsigComponent;
  let fixture: ComponentFixture<EditAsigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAsigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAsigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
