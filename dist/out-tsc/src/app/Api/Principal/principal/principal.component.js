import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
let PrincipalComponent = class PrincipalComponent {
    constructor(config) {
        this.config = config;
    }
    ngOnInit() { }
    getCategorias() {
        return this.config.claim('Principal', 'getCategorias', {});
    }
    getNegocios(params) {
        return this.config.claim('Principal', 'getNegocios', params);
    }
    getProductos(params) {
        return this.config.claim('Principal', 'getProductos', params);
    }
    getProducto(params) {
        return this.config.claim('Principal', 'getProducto', params);
    }
    getPrediccion(params) {
        return this.config.claim('Principal', 'GetPrediccion', params);
    }
};
PrincipalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-principal'
    }),
    tslib_1.__metadata("design:paramtypes", [ConfiguracionComponent])
], PrincipalComponent);
export { PrincipalComponent };
//# sourceMappingURL=principal.component.js.map