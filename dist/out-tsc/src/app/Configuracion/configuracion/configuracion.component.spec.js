import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ConfiguracionComponent } from './configuracion.component';
describe('ConfiguracionComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ConfiguracionComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ConfiguracionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=configuracion.component.spec.js.map