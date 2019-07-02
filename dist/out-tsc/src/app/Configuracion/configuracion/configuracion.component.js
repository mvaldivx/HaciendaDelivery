import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var ConfiguracionComponent = /** @class */ (function () {
    function ConfiguracionComponent(httpClient) {
        this.httpClient = httpClient;
        this.rutaImagenes = '//localhost:80/SAD/Images/Categorias/';
        this.rutaImagenesNegocios = '//localhost:80/SAD/Images/Negocios/';
        this.puerto = '80';
        this.servidor = 'http://localhost';
    }
    ConfiguracionComponent.prototype.getRutaImagenes = function () {
        return this.rutaImagenes;
    };
    ConfiguracionComponent.prototype.getRutaImagenesNegocios = function () {
        return this.rutaImagenesNegocios;
    };
    ConfiguracionComponent.prototype.claim = function (padre, archivo, params) {
        return this.httpClient.get(this.servidor + ':' + this.puerto + '/SAD/' + padre + '/' + archivo + '.php', { params: params });
    };
    ConfiguracionComponent.prototype.ngOnInit = function () { };
    ConfiguracionComponent = tslib_1.__decorate([
        Component({
            selector: 'app-configuracion'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ConfiguracionComponent);
    return ConfiguracionComponent;
}());
export { ConfiguracionComponent };
//# sourceMappingURL=configuracion.component.js.map