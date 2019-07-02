import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { CategoriasPage } from './categorias.page';
describe('CategoriasPage', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CategoriasPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CategoriasPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=categorias.page.spec.js.map