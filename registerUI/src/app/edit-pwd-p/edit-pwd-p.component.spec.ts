import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPwdPComponent } from './edit-pwd-p.component';

describe('EditPwdPComponent', () => {
  let component: EditPwdPComponent;
  let fixture: ComponentFixture<EditPwdPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPwdPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPwdPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
