import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
var PrincipalComponent = /** @class */ (function () {
    function PrincipalComponent(config) {
        this.config = config;
    }
    PrincipalComponent.prototype.ngOnInit = function () { };
    PrincipalComponent.prototype.getCategorias = function () {
        return this.config.claim('Principal', 'GetCategorias', '');
    };
    PrincipalComponent.prototype.getPrediccion = function (params) {
        return this.config.claim('Principal', 'GetPrediccion', params);
    };
    PrincipalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-principal'
        }),
        tslib_1.__metadata("design:paramtypes", [ConfiguracionComponent])
    ], PrincipalComponent);
    return PrincipalComponent;
}());
export { PrincipalComponent };
//# sourceMappingURL=principal.component.js.map