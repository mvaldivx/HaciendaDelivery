import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavController, Events, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AnunciosService } from '../../Api/Services/Anuncios/anuncios.service';
import { ConfiguracionComponent } from '../../Configuracion/configuracion/configuracion.component';
import { ModificarNegocioPage } from '../modificar-negocio/modificar-negocio.page';
import { myEnterAnimation, myLeaveAnimation } from '../../Transitions/ModalEnterAnimation';
import 'hammerjs';
let AnunciosPage = class AnunciosPage {
    constructor(navCtrl, storage, AnunciosServ, configuracion, events, modalCtrl) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.AnunciosServ = AnunciosServ;
        this.configuracion = configuracion;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.misNegocios = [];
        this.cargando = true;
        this.rutaImagenesNegocios = '';
        this.changingStatus = false;
        this.nuevoAnuncio = false;
        this.visibleNuevoAnuncio = false;
        this.detalleNegocio = false;
        this.visibledetalleNegocio = false;
        this.selectedIdNegocio = 0;
        this.rutaNoImage = '';
        this.EditAdSelected = { IdProducto: 0, IdNegocio: 0, edit: false };
        this.rutaNoImage = this.configuracion.rutaNoImage;
        this.rutaImagenesNegocios = this.configuracion.rutaImagenesLogos;
        events.subscribe('anuncios:insertado', () => {
            this.setNuevoAnuncioState(false);
        });
        events.subscribe('modifica:anuncio', (info) => {
            this.setdetalleNegocioState(false);
            this.EditAdSelected = info;
            setTimeout(() => {
                this.newAd();
            }, 500);
        });
    }
    ngOnInit() {
        this.storage.get('Usuario').then(usr => {
            if (usr.IdUsuario) {
                this.usuario = usr;
                this.ObtieneAnuncios(usr.IdUsuario);
            }
            else {
                this.navCtrl.navigateRoot(['']);
            }
        });
    }
    ObtieneAnuncios(idUsuario) {
        this.AnunciosServ.getMisNegocios({ IdUsuario: idUsuario }).subscribe(res => {
            this.misNegocios = res;
            this.cargando = false;
        });
    }
    close() {
        this.navCtrl.navigateRoot(['']);
    }
    changeStatusNegocio(idNegocio, estatus, ev) {
        this.changingStatus = true;
        if (ev.returnValue)
            this.AnunciosServ.ChangeNegocioEstatus({ IdNegocio: idNegocio, Estatus: (estatus) ? 1 : 0 }).subscribe(() => {
                this.changingStatus = false;
            }, (err) => {
                this.changingStatus = false;
            });
    }
    getProductos(IdNegocio) {
        if (!this.changingStatus) {
            this.selectedIdNegocio = IdNegocio;
            this.setdetalleNegocioState(true);
        }
    }
    newAd() {
        this.setNuevoAnuncioState(true);
        //this.navCtrl.navigateForward(['nuevo-anuncio'])
    }
    NuevoAnuncioSwipe(e) {
        if (e.direction === 4) {
            this.setNuevoAnuncioState(false);
        }
    }
    setNuevoAnuncioState(state) {
        this.nuevoAnuncio = state;
        if (state)
            this.visibleNuevoAnuncio = state;
        else
            setTimeout(() => {
                this.visibleNuevoAnuncio = state;
            }, 500);
    }
    setdetalleNegocioState(state) {
        this.detalleNegocio = state;
        if (state)
            this.visibledetalleNegocio = state;
        else
            setTimeout(() => {
                this.visibledetalleNegocio = state;
            }, 500);
    }
    ModificaNegocio(idNegocio) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.changingStatus = true;
            const modal = yield this.modalCtrl.create({
                component: ModificarNegocioPage,
                enterAnimation: myEnterAnimation,
                leaveAnimation: myLeaveAnimation,
                componentProps: { IdNegocio: idNegocio }
            });
            modal.onDidDismiss().then(res => {
                this.changingStatus = false;
                if (res.data) {
                }
            });
            return yield modal.present();
        });
    }
};
AnunciosPage = tslib_1.__decorate([
    Component({
        selector: 'app-anuncios',
        templateUrl: './anuncios.page.html',
        styleUrls: ['./anuncios.page.scss'],
        animations: [
            trigger('fadein', [
                state('void', style({ opacity: 0, left: '-1000px' })),
                transition('void => *', [
                    style({ opacity: 1 }),
                    animate('600ms ease-out', style({ left: 0 }))
                ])
            ])
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [NavController,
        Storage,
        AnunciosService,
        ConfiguracionComponent,
        Events,
        ModalController])
], AnunciosPage);
export { AnunciosPage };
//# sourceMappingURL=anuncios.page.js.map