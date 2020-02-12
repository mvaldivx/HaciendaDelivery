import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { PrincipalComponent } from '../../../Api/Principal/principal/principal.component';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
import { DescripcionProductoPage } from '../descripcion-producto/descripcion-producto.page';
import { UtilsComponent } from '../../../utils/utils.component';
let ProductosPage = class ProductosPage {
    constructor(route, navCtrl, ApiPrincipal, configuracion, modalCtrl, utils) {
        this.route = route;
        this.navCtrl = navCtrl;
        this.ApiPrincipal = ApiPrincipal;
        this.configuracion = configuracion;
        this.modalCtrl = modalCtrl;
        this.utils = utils;
        this.Negocio = "";
        this.IdNegocio = 0;
        this.rutaImagenProducto = "";
        this.loading = true;
    }
    ngOnInit() {
        this.rutaImagenProducto = this.configuracion.rutaImagenesProductos;
        this.route.queryParams.subscribe(params => {
            this.IdNegocio = params["IdNegocio"];
            this.Negocio = params["Negocio"];
        });
        if (this.IdNegocio != null) {
            this.ApiPrincipal.getProductos({ idNegocio: this.IdNegocio }).subscribe(res => {
                this.Productos = res;
                this.loading = false;
            });
        }
        else {
            this.navCtrl.navigateRoot('categorias');
        }
    }
    DescripcionProducto(idNegocio, idProducto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalCtrl.create({
                component: DescripcionProductoPage,
                componentProps: {
                    'IdNegocio': idNegocio,
                    'IdProducto': idProducto,
                    'Aumenta': false
                },
                cssClass: 'my-custom-modal-css'
            });
            yield modal.present();
            const { data } = yield modal.onWillDismiss();
            if (data.status == 2) {
                this.presentToast();
            }
        });
    }
    presentToast() {
        this.utils.showToast('Producto agregado correctamente.');
        /*const toast = await this.toastCtrl.create({
          message: 'Producto agregado correctamente.',
          duration: 2000
        });
        toast.present();*/
    }
};
ProductosPage = tslib_1.__decorate([
    Component({
        selector: 'app-productos',
        templateUrl: './productos.page.html',
        styleUrls: ['./productos.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        NavController,
        PrincipalComponent,
        ConfiguracionComponent,
        ModalController,
        UtilsComponent])
], ProductosPage);
export { ProductosPage };
//# sourceMappingURL=productos.page.js.map