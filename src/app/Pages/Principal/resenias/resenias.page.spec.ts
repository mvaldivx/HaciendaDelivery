import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseniasPage } from './resenias.page';

describe('ReseniasPage', () => {
  let component: ReseniasPage;
  let fixture: ComponentFixture<ReseniasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReseniasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseniasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
