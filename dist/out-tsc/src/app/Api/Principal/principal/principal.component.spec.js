import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { PrincipalComponent } from './principal.component';
describe('PrincipalComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PrincipalComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PrincipalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=principal.component.spec.js.map