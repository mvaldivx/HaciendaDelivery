import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { NegociosPage } from './negocios.page';
describe('NegociosPage', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [NegociosPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(NegociosPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=negocios.page.spec.js.map