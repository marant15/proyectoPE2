import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusersComponent } from './cusers.component';

describe('CusersComponent', () => {
  let component: CusersComponent;
  let fixture: ComponentFixture<CusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
