import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { PrincipalComponent } from '../../../Api/Principal/principal/principal.component';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
import { CalificacionesService } from '../../../Api/Services/Calificaciones/calificaciones.service';
import { ReseniasPage } from '../resenias/resenias.page';
import { Storage } from '@ionic/storage';
let NegociosPage = class NegociosPage {
    constructor(route, navCtrl, principalApi, configuracion, calificaciones, modalCtrl, storage) {
        this.route = route;
        this.navCtrl = navCtrl;
        this.principalApi = principalApi;
        this.configuracion = configuracion;
        this.calificaciones = calificaciones;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.IdCategoria = 0;
        this.Categoria = "";
        this.rutaImagenLogo = "";
        this.calTmp = [];
        this.loading = true;
        this.imagenesCargadas = 0;
        this.rutaNoImage = "";
    }
    ngOnInit() {
        this.rutaImagenLogo = this.configuracion.rutaImagenesLogos;
        this.rutaNoImage = this.configuracion.rutaNoImage;
        this.storage.get('categoria').then(cat => {
            this.Categoria = cat;
        });
        this.route.queryParams.subscribe(params => {
            this.IdCategoria = params["IdCategoria"];
            // this.Categoria = params["Categoria"]
        });
        if (this.IdCategoria != null) {
            this.principalApi.getNegocios({ idCategoria: this.IdCategoria }).subscribe(res => {
                this.Negocios = res;
                this.NegociosR = res;
                this.loading = false;
            });
        }
        else {
            this.navCtrl.navigateRoot('categorias');
        }
    }
    getCalificacion(Calificacion) {
        var res = [];
        let prom = Calificacion;
        if (!isNaN(prom) && Calificacion > 0)
            res = [{ n: 1, t: (prom == 0) ? 3 : (prom < 1) ? 2 : 1 },
                { n: 2, t: (prom <= 1) ? 3 : (prom < 2) ? 2 : 1 },
                { n: 3, t: (prom <= 2) ? 3 : (prom < 3) ? 2 : 1 },
                { n: 4, t: (prom <= 3) ? 3 : (prom < 4) ? 2 : 1 },
                { n: 5, t: (prom <= 4) ? 3 : (prom < 5) ? 2 : 1 }];
        return res;
    }
    ShowProductos(id, Negocio) {
        let navExtras = {
            queryParams: {
                IdNegocio: id,
                Negocio: Negocio
            }
        };
        this.navCtrl.navigateForward(['productos'], navExtras);
    }
    getResenias(IdNegocio) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalCtrl.create({
                component: ReseniasPage,
                componentProps: {
                    'IdNegocio': IdNegocio
                }
            });
            yield modal.present();
        });
    }
    imagenCargada(IdNegocio) {
        this.imagenesCargadas += 1;
        if (this.imagenesCargadas == this.NegociosR.length) {
            this.loading = false;
        }
    }
    errorImage(idNegocio) {
        this.imagenesCargadas += 1;
        if (this.imagenesCargadas == this.NegociosR.length) {
            this.loading = false;
        }
        this.NegociosR.forEach(n => {
            if (n.IdNegocio == idNegocio)
                n.imgError = true;
        });
    }
};
NegociosPage = tslib_1.__decorate([
    Component({
        selector: 'app-negocios',
        templateUrl: './negocios.page.html',
        styleUrls: ['./negocios.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        NavController,
        PrincipalComponent,
        ConfiguracionComponent,
        CalificacionesService,
        ModalController,
        Storage])
], NegociosPage);
export { NegociosPage };
//# sourceMappingURL=negocios.page.js.map