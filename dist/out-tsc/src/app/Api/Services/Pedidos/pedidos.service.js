import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
let PedidosService = class PedidosService {
    constructor(Configuracion) {
        this.Configuracion = Configuracion;
    }
    getPedidos(idUsuario) {
        return this.Configuracion.claim('Pedidos', 'getPedidos', idUsuario);
    }
    CreaPedido(pedido) {
        return this.Configuracion.claimPost('Pedidos', 'CreaPedido', pedido);
    }
    GuardaDetallePedido(DetallePedido) {
        return this.Configuracion.claimPost('Pedidos', 'GuardaDetallePedido', DetallePedido);
    }
    getPedido(IdPedido) {
        return this.Configuracion.claim('Pedidos', 'getPedido', IdPedido);
    }
    getDetallePedido(IdPedido) {
        return this.Configuracion.claim('Pedidos', 'getDetallePedido', IdPedido);
    }
};
PedidosService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ConfiguracionComponent])
], PedidosService);
export { PedidosService };
//# sourceMappingURL=pedidos.service.js.map