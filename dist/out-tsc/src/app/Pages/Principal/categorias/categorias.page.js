import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MenuController, IonSearchbar, NavController, ModalController, PopoverController } from '@ionic/angular';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
import { PrincipalComponent } from '../../../Api/Principal/principal/principal.component';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { CarritoPage } from '../../carrito/carrito.page';
import { DireccionesPage } from '../../direcciones/direcciones.page';
import { DireccionesService } from '../../../Api/Services/Direcciones/direcciones.service';
import { StoreDireccionesService } from '../../../Api/Services/Direcciones/Store/store.service';
let CategoriasPage = class CategoriasPage {
    constructor(menu, configuracion, ApiPrincipal, navCtrl, storage, modalCtrl, popoverDir, direccionServ, storeDirecciones) {
        this.menu = menu;
        this.configuracion = configuracion;
        this.ApiPrincipal = ApiPrincipal;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.popoverDir = popoverDir;
        this.direccionServ = direccionServ;
        this.storeDirecciones = storeDirecciones;
        this.searchbar = false;
        this.searchbarVal = '';
        this.autocomplete = [];
        this.numProductos = 0;
        this.rutaimagenes = "";
        this.rutaimagenes = this.configuracion.rutaImagenes;
        this.getNumProductos();
        this.getDireccion();
    }
    ngOnInit() {
        this.ApiPrincipal.getCategorias().subscribe(data => {
            this.Categorias = data;
        });
        /*this.categoriasService.getCategorias().subscribe(res=>{
          //debugger;
          this.Categorias = res;
        })*/
    }
    ionViewWillEnter() {
        this.getNumProductos();
    }
    ShowNegocios(id, categoria) {
        this.storage.set('categoria', categoria);
        let navExtras = {
            queryParams: {
                IdCategoria: id,
                Categoria: categoria
            }
        };
        this.navCtrl.navigateForward(['negocios'], navExtras);
    }
    openFirst() {
        this.menu.toggle('first');
    }
    rutaImagen() {
        return this.configuracion.getRutaImagenes();
    }
    setsearch() {
        this.autocomplete = [];
        this.searchbarVal = '';
        this.searchbar = !this.searchbar;
        if (this.searchbar)
            setTimeout(() => { this.myInput.setFocus(); }, 150);
    }
    getOptions() {
        if (this.searchbarVal.length > 0) {
            let par = new HttpParams().set('Palabra', this.searchbarVal);
            this.ApiPrincipal.getPrediccion(par).subscribe(data => {
                if (data.length > 0) {
                    this.autocomplete = data;
                }
                else
                    this.autocomplete = [];
            });
        }
        else {
            this.autocomplete = [];
        }
    }
    getNumProductos() {
        let date = new Date();
        const _MS_PER_DAY = 1000 * 60 * 60;
        this.storage.get('carrito').then((carrito) => {
            if (carrito != null && carrito.Productos != null) {
                let fa = new Date(carrito.Fecha);
                let diff = (date.getTime() - fa.getTime()) / _MS_PER_DAY;
                if (diff >= 2) {
                    this.storage.remove('carrito');
                }
                else {
                    this.numProductos = carrito.Productos.length;
                }
            }
            else {
                this.numProductos = 0;
            }
        });
    }
    irCarrito() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalCtrl.create({
                component: CarritoPage,
                cssClass: 'my-custom-modal-css'
            });
            yield modal.present();
            yield modal.onWillDismiss().then(() => {
                this.getNumProductos();
            });
        });
    }
    getDireccion() {
        this.storage.get('Usuario').then(usr => {
            if (usr) {
                this.direccionServ.getDirecciones(usr.IdUsuario).subscribe(d => {
                    this.storeDirecciones.direcciones = d;
                });
            }
            else {
                this.storage.get('ubicacion').then(u => {
                    if (u)
                        this.storeDirecciones.selectedDir = u;
                });
            }
        });
    }
    presentPopover(ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const popover = yield this.popoverDir.create({
                component: DireccionesPage,
                event: ev,
                translucent: true
            });
            return yield popover.present();
        });
    }
};
tslib_1.__decorate([
    ViewChild('searchb', null),
    tslib_1.__metadata("design:type", IonSearchbar)
], CategoriasPage.prototype, "myInput", void 0);
CategoriasPage = tslib_1.__decorate([
    Component({
        selector: 'app-categorias',
        templateUrl: './categorias.page.html',
        styleUrls: ['./categorias.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [MenuController,
        ConfiguracionComponent,
        PrincipalComponent,
        NavController,
        Storage,
        ModalController,
        PopoverController,
        DireccionesService,
        StoreDireccionesService])
], CategoriasPage);
export { CategoriasPage };
//# sourceMappingURL=categorias.page.js.map