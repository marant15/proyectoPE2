import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLibroComponent } from './register-libro.component';

describe('RegisterLibroComponent', () => {
  let component: RegisterLibroComponent;
  let fixture: ComponentFixture<RegisterLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
