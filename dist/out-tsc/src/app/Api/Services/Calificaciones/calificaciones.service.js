import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfiguracionComponent } from 'src/app/Configuracion/configuracion/configuracion.component';
let CalificacionesService = class CalificacionesService {
    constructor(configuracion) {
        this.configuracion = configuracion;
    }
    getResenias(idNegocio) {
        return this.configuracion.claim('Calificaciones', 'getResenias', { IdNegocio: idNegocio });
    }
    insertResenia(resenia) {
        return this.configuracion.claimPost('Calificaciones', 'insertaResenia', resenia);
    }
};
CalificacionesService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ConfiguracionComponent])
], CalificacionesService);
export { CalificacionesService };
//# sourceMappingURL=calificaciones.service.js.map