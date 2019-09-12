import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BingComponent } from './bing.component';

describe('BingComponent', () => {
  let component: BingComponent;
  let fixture: ComponentFixture<BingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BingComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
