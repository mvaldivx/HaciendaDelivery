import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavController, ModalController } from '@ionic/angular';
import { PedidosService } from '../../Api/Services/Pedidos/pedidos.service';
import { Storage } from '@ionic/storage';
import { UtilsComponent } from 'src/app/utils/utils.component';
import leaflet from 'leaflet';
import { PrincipalComponent } from '../../Api/Principal/principal/principal.component';
import { ActivatedRoute } from '@angular/router';
import { CalificarPage } from '../calificar/calificar.page';
import { myEnterAnimation, myLeaveAnimation } from '../../Transitions/ModalEnterAnimation';
let PedidosPage = class PedidosPage {
    constructor(navCtrl, PedidosServ, storage, utils, ProductosServ, route, modalCtrl) {
        this.navCtrl = navCtrl;
        this.PedidosServ = PedidosServ;
        this.storage = storage;
        this.utils = utils;
        this.ProductosServ = ProductosServ;
        this.route = route;
        this.modalCtrl = modalCtrl;
        this.meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        this.detalle = false;
        this.cargando = true;
        this.calificado = false;
    }
    ngOnInit() {
        this.ObtienePedidos().then(r => {
            if (r) {
                setTimeout(() => {
                    this.GeneraMapas();
                    this.route.queryParams.subscribe(params => {
                        if (params['fromNotificacion']) {
                            this.getDetallePedido(params['DatosPedido']);
                        }
                    });
                }, 500);
            }
        });
    }
    ObtienePedidos() {
        return new Promise(resolve => {
            this.storage.get('Usuario').then(usr => {
                if (usr) {
                    this.PedidosServ.getPedidos({ idUsuario: usr.IdUsuario }).subscribe(pedidos => {
                        this.Pedidos = pedidos ? pedidos : [];
                        this.Pedidos.forEach(p => {
                            var dat = new Date(p.FechaPedido);
                            var dc = new Date(p.FechaConcluido);
                            var fp = dat.toLocaleDateString("en-US").split('/');
                            var fc = dc.toLocaleDateString("en-US").split('/');
                            p.FechaPedido = fp[1] + ' ' + this.meses[parseInt(fp[0]) - 1] + ' ' + fp[2] + '  ' + this.getHora(dat.getHours()) + ':' + dat.getMinutes() + ' ' + ((dat.getHours() >= 12) ? 'PM' : 'AM');
                            p.FechaConcluido = (fc[2] == '1999') ? '' : fc[1] + ' ' + this.meses[parseInt(fc[0]) - 1] + ' ' + fc[2] + '  ' + this.getHora(dc.getHours()) + ':' + dc.getMinutes() + ' ' + ((dc.getHours() >= 12) ? 'PM' : 'AM');
                        });
                        this.cargando = false;
                        resolve(true);
                    });
                }
                else {
                    this.utils.alertUsuario();
                    this.cargando = false;
                    resolve(false);
                }
            });
        });
    }
    GeneraMapas() {
        this.Pedidos.forEach(p => {
            var map;
            var mapa = document.getElementById('map' + p.IdPedido);
            map = leaflet.map(mapa, { zoomControl: false, dragging: false }).fitWorld();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
            leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
            map.setView([p.lat, p.lng], 16);
            leaflet.DomEvent.stopPropagation;
            var marker = leaflet.marker([p.lat, p.lng], { draggable: false });
            var markerGroup = leaflet.featureGroup();
            ;
            markerGroup.addLayer(marker);
            map.addLayer(markerGroup);
        });
    }
    getHora(hora) {
        if (hora <= 12) {
            return hora;
        }
        else {
            return hora - 12;
        }
    }
    close() {
        this.navCtrl.navigateRoot(['']);
    }
    getDetallePedido(Pedido) {
        if (!this.detalle) {
            this.PedidoSelected = Pedido;
            this.PedidosServ.getDetallePedido({ IdPedido: Pedido.IdPedido }).subscribe(dp => {
                this.DetallePedido = [];
                dp.forEach(d => {
                    this.calificado = (d.calificado > 0) ? false : true;
                    var detalle = { IdNegocio: 0, IdProducto: 0, Cantidad: 0, ComentsAdi: "", Precio: 0, Producto: "", calificado: 0 };
                    detalle.Cantidad = d.Cantidad;
                    detalle.ComentsAdi = d.ComentsAdi;
                    detalle.Precio = d.Precio;
                    detalle.IdNegocio = d.IdNegocio;
                    detalle.IdProducto = d.IdProducto;
                    this.ProductosServ.getProducto({ idProducto: d.IdProducto }).subscribe(prod => {
                        if (prod.length > 0) {
                            detalle.Producto = prod[0].Producto;
                            this.DetallePedido.push(detalle);
                        }
                    });
                });
                //Crea Mapa Detalle
                var map;
                var mapa = document.getElementById('mapaDetalle');
                map = leaflet.map(mapa, {}).fitWorld();
                map.boxZoom.disable();
                map.keyboard.disable();
                leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
                map.setView([this.PedidoSelected.lat, this.PedidoSelected.lng], 16);
                leaflet.DomEvent.stopPropagation;
                var marker = leaflet.marker([this.PedidoSelected.lat, this.PedidoSelected.lng], { draggable: false });
                var markerGroup = leaflet.featureGroup();
                markerGroup.addLayer(marker);
                map.addLayer(markerGroup);
            });
            this.detalle = true;
            this.cargando = false;
        }
        else {
            this.cargando = false;
        }
    }
    calificar() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalCtrl.create({
                component: CalificarPage,
                enterAnimation: myEnterAnimation,
                leaveAnimation: myLeaveAnimation,
                componentProps: { detallePedido: this.DetallePedido, pedido: this.PedidoSelected }
            });
            modal.onDidDismiss().then(res => {
                if (res.data) {
                    if (res.data['exitoso']) {
                        this.calificado = false;
                    }
                    this.utils.showToast(res.data['res']);
                }
            });
            return yield modal.present();
        });
    }
};
tslib_1.__decorate([
    ViewChild('map', { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], PedidosPage.prototype, "mapContainer", void 0);
PedidosPage = tslib_1.__decorate([
    Component({
        selector: 'app-pedidos',
        templateUrl: './pedidos.page.html',
        styleUrls: ['./pedidos.page.scss'],
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
        PedidosService,
        Storage,
        UtilsComponent,
        PrincipalComponent,
        ActivatedRoute,
        ModalController])
], PedidosPage);
export { PedidosPage };
//# sourceMappingURL=pedidos.page.js.map