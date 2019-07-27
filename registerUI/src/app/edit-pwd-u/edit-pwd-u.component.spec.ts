import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPwdUComponent } from './edit-pwd-u.component';

describe('EditPwdUComponent', () => {
  let component: EditPwdUComponent;
  let fixture: ComponentFixture<EditPwdUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPwdUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPwdUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
