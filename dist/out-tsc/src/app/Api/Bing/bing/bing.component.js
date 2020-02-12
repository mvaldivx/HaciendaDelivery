import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
let BingComponent = class BingComponent {
    constructor(config) {
        this.config = config;
    }
    ngOnInit() { }
    getPlaces(query) {
        var q = query.replace(/ /g, '%20');
        var peticion = this.config.UrlBingQuery + '?q=' + q + ',MEX' + '&key=' + this.config.bingKey;
        return this.config.bingClaim(peticion);
    }
};
BingComponent = tslib_1.__decorate([
    Component({
        selector: 'app-bing'
    }),
    tslib_1.__metadata("design:paramtypes", [ConfiguracionComponent])
], BingComponent);
export { BingComponent };
//# sourceMappingURL=bing.component.js.map