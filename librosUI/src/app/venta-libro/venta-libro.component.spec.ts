import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaLibroComponent } from './venta-libro.component';

describe('VentaLibroComponent', () => {
  let component: VentaLibroComponent;
  let fixture: ComponentFixture<VentaLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
