import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { AnunciosService } from '../../../Api/Services/Anuncios/anuncios.service';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
import { Events } from '@ionic/angular';
let DetalleNegocioComponent = class DetalleNegocioComponent {
    constructor(AnunciosServ, configuracion, events) {
        this.AnunciosServ = AnunciosServ;
        this.configuracion = configuracion;
        this.events = events;
        this.anuncios = [];
        this.direccionimagenes = '';
        this.rutaNoImage = '';
        this.rutaNoImage = this.configuracion.rutaNoImage;
        this.direccionimagenes = this.configuracion.rutaImagenesProductos;
    }
    ngOnInit() {
        this.ObtenerAnuncios();
    }
    ObtenerAnuncios() {
        this.AnunciosServ.getAnunciosNegocio({ Negocio: this.IdNegocio }).subscribe(res => {
            this.anuncios = res;
        });
    }
    ModificaAnuncio(IdProducto) {
        this.events.publish('modifica:anuncio', { IdProducto: IdProducto, IdNegocio: this.IdNegocio, edit: true });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DetalleNegocioComponent.prototype, "IdNegocio", void 0);
DetalleNegocioComponent = tslib_1.__decorate([
    Component({
        selector: 'app-detalle-negocio',
        templateUrl: './detalle-negocio.component.html',
        styleUrls: ['./detalle-negocio.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [AnunciosService,
        ConfiguracionComponent,
        Events])
], DetalleNegocioComponent);
export { DetalleNegocioComponent };
//# sourceMappingURL=detalle-negocio.component.js.map