import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { CarritoPage } from './carrito.page';
describe('CarritoPage', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CarritoPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CarritoPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=carrito.page.spec.js.map