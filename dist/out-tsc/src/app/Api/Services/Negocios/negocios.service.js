import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
let NegociosService = class NegociosService {
    constructor(configuracion) {
        this.configuracion = configuracion;
    }
    getInfoNegocio(IdNegocio) {
        return this.configuracion.claim('Negocios', 'getInfoNegocio', IdNegocio);
    }
    updateNegocio(data) {
        return this.configuracion.claimPost('Negocios', 'UpdateNegocio', data);
    }
};
NegociosService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ConfiguracionComponent])
], NegociosService);
export { NegociosService };
//# sourceMappingURL=negocios.service.js.map