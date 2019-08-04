import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPwdDComponent } from './edit-pwd-d.component';

describe('EditPwdDComponent', () => {
  let component: EditPwdDComponent;
  let fixture: ComponentFixture<EditPwdDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPwdDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPwdDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
