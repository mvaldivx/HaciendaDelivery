import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
let AnunciosService = class AnunciosService {
    constructor(configuracion) {
        this.configuracion = configuracion;
    }
    getMisNegocios(IdUsuario) {
        return this.configuracion.claim('Anuncios', 'getMisNegocios', IdUsuario);
    }
    ChangeNegocioEstatus(data) {
        return this.configuracion.claimPost('Anuncios', 'ChangeNegocioEstatus', data);
    }
    getCategorias() {
        return this.configuracion.claim('Anuncios', 'getCategorias', {});
    }
    NuevoAnuncio(anuncio) {
        return this.configuracion.claimPost('Anuncios', 'NuevoAnuncio', anuncio);
    }
    getAnunciosNegocio(Negocio) {
        return this.configuracion.claim('Anuncios', 'GetAnunciosNegocio', Negocio);
    }
    getinfoAnuncio(info) {
        return this.configuracion.claim('Anuncios', 'getInfoAnuncio', info);
    }
};
AnunciosService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ConfiguracionComponent])
], AnunciosService);
export { AnunciosService };
//# sourceMappingURL=anuncios.service.js.map