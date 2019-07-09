import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RCsComponent } from './r-cs.component';

describe('RCsComponent', () => {
  let component: RCsComponent;
  let fixture: ComponentFixture<RCsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RCsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
