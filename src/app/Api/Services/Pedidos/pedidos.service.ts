import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'

export interface Pedido {
  IdPedido: number;
  IdUsuario: number;
  FechaPedido: Date;
  Estatus: string;
  Calle: string;
  FechaConcluido: Date;
  Numero: string;
  Total: number;
  lat: number;
  lng: number;
}

export interface IdPedido{
  IdPedido:number;
}

export interface DetallePedido{
  IdPedido: number;
  Cantidad: number;
  ComentsAdi: string;
  IdNegocio: number;
  IdProducto: number;
  Precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  
  constructor(
    private Configuracion: ConfiguracionComponent
  ) { 
  }

  getPedidos(idUsuario): Observable<any>{
    return this.Configuracion.claim('Pedidos','getPedidos',idUsuario)
  }

  CreaPedido(pedido){
    return this.Configuracion.claimPost('Pedidos','CreaPedido',pedido)
  }

  GuardaDetallePedido(DetallePedido: DetallePedido): Observable<any>{
    return this.Configuracion.claimPost('Pedidos','GuardaDetallePedido',DetallePedido)
  }

  getPedido(IdPedido): Observable<any>{
    return this.Configuracion.claim('Pedidos','getPedido',IdPedido)
  }

  getDetallePedido(IdPedido): Observable<any>{
    return this.Configuracion.claim('Pedidos','getDetallePedido',IdPedido)
  }
}
