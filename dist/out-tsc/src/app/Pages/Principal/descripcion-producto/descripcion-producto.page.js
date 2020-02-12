import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PrincipalComponent } from '../../../Api/Principal/principal/principal.component';
import { NavParams, ModalController } from '@ionic/angular';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
import { Storage } from '@ionic/storage';
let DescripcionProductoPage = class DescripcionProductoPage {
    constructor(productos, navParams, modalCtrl, configuracion, storage) {
        this.productos = productos;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.configuracion = configuracion;
        this.storage = storage;
        this.IdNegocio = 0;
        this.IdProducto = 0;
        this.cantidad = 1;
        this.rutaImagenProducto = "";
        this.ComentsAdi = "";
        this.Aumenta = false;
        this.idPosicion = 0;
    }
    ngOnInit() {
        this.rutaImagenProducto = this.configuracion.rutaImagenesProductos;
        this.IdNegocio = this.navParams.get('IdNegocio');
        this.IdProducto = this.navParams.get('IdProducto');
        this.Aumenta = this.navParams.get('Aumenta');
        this.ComentsAdi = this.navParams.get('ComentsAdi');
        this.idPosicion = this.navParams.get('idPosicion');
        this.productos.getProducto({ idProducto: this.IdProducto }).subscribe(res => {
            if (res.length > 0) {
                this.Producto = res[0];
                if (this.Aumenta)
                    this.ObtienePedido();
            }
        });
    }
    closeDescripcion(tipo) {
        this.modalCtrl.dismiss({
            'status': tipo
        });
    }
    editCantidad(tipo) {
        if (tipo === '+') {
            this.cantidad += 1;
        }
        else {
            if (this.cantidad > 0)
                this.cantidad -= 1;
        }
    }
    ObtienePedido() {
        this.storage.get('carrito').then((carrito) => {
            if (carrito != null && carrito.Productos != null) {
                carrito.Productos.forEach(prod => {
                    if (prod.Producto.IdProducto == this.IdProducto && prod.ComentsAdi == this.ComentsAdi) {
                        this.cantidad = prod.Cantidad;
                        this.ComentsAdi = prod.ComentsAdi;
                    }
                });
            }
        });
    }
    agregarProducto() {
        let date = new Date();
        const _MS_PER_DAY = 1000 * 60 * 60;
        this.storage.get('carrito').then((carrito) => {
            let agregado = false;
            if (carrito != null && carrito.Productos != null && carrito.Fecha != null) {
                let fa = new Date(carrito.Fecha);
                let diff = (date.getTime() - fa.getTime()) / _MS_PER_DAY;
                if (diff < 2) {
                    let exist = false;
                    carrito.Productos.forEach(prod => {
                        if ((prod.idPosicion === this.idPosicion) && this.Aumenta) {
                            prod.Cantidad = (this.Aumenta) ? this.cantidad : prod.Cantidad + this.cantidad;
                            prod.ComentsAdi = this.ComentsAdi;
                            exist = true;
                        }
                        else if (!this.Aumenta && (this.ComentsAdi === prod.ComentsAdi && this.IdProducto === prod.Producto.IdProducto)) {
                            prod.Cantidad = this.cantidad + prod.Cantidad;
                            exist = true;
                        }
                    });
                    if (!exist) {
                        carrito.Productos.push({
                            idPosicion: new Date().valueOf(),
                            Cantidad: this.cantidad,
                            Producto: this.Producto,
                            ComentsAdi: this.ComentsAdi
                        });
                    }
                    carrito.Fecha = date.getTime();
                    this.storage.set('carrito', carrito);
                    agregado = true;
                }
            }
            if (!agregado) {
                let carriton = {
                    Productos: [{
                            idPosicion: new Date().valueOf(),
                            Cantidad: this.cantidad,
                            Producto: this.Producto,
                            ComentsAdi: this.ComentsAdi
                        }],
                    Fecha: date.getTime()
                };
                this.storage.set('carrito', carriton);
            }
        }).finally(() => {
            this.closeDescripcion(2);
        });
    }
};
DescripcionProductoPage = tslib_1.__decorate([
    Component({
        selector: 'app-descripcion-producto',
        templateUrl: './descripcion-producto.page.html',
        styleUrls: ['./descripcion-producto.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [PrincipalComponent,
        NavParams,
        ModalController,
        ConfiguracionComponent,
        Storage])
], DescripcionProductoPage);
export { DescripcionProductoPage };
//# sourceMappingURL=descripcion-producto.page.js.map