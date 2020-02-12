import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarNegocioPage } from './modificar-negocio.page';

describe('ModificarNegocioPage', () => {
  let component: ModificarNegocioPage;
  let fixture: ComponentFixture<ModificarNegocioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarNegocioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarNegocioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
