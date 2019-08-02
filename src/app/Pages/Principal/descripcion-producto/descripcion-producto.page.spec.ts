import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionProductoPage } from './descripcion-producto.page';

describe('DescripcionProductoPage', () => {
  let component: DescripcionProductoPage;
  let fixture: ComponentFixture<DescripcionProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescripcionProductoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripcionProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
