import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private Pedidos:AngularFirestoreCollection<Pedido>;
  private PedidosFB: Observable<Pedido[]>;
  private PedidosDetalle:AngularFirestoreCollection<DetallePedido>;
  private PedidosDetalleFB: Observable<DetallePedido[]>;
  constructor(private db: AngularFirestore) { 
    this.Pedidos = this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido'));

    this.PedidosFB = this.Pedidos.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )

    this.PedidosDetalle = this.db.collection<DetallePedido>('DetallePedido', ref=> ref.orderBy('IdPedido'));

    this.PedidosDetalleFB = this.PedidosDetalle.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
  }

  getPedidos(idUsuario){
    this.Pedidos = this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido').where('IdUsuario','==',idUsuario));
    return this.Pedidos.valueChanges()
  }

  CreaPedido(pedido:Pedido){
    return this.Pedidos.add(pedido);
  }

  GuardaDetallePedido(DetallePedido: DetallePedido){
    return this.PedidosDetalle.add(DetallePedido);
  }

  getUltimoIdPedido(){
    return  this.db.collection<IdPedido>('Pedidos', ref=> ref.orderBy('IdPedido','desc').limit(1)).valueChanges();
  }
}
