import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Producto {
  IdProducto: number;
  IdNegocio: number
  Descripcion: string;
  Producto: string;
  Precio: number;
}
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private Productos:AngularFirestoreCollection<Producto>;
  private ProductosFB: Observable<Producto[]>;

  constructor(private db: AngularFirestore) {
    this.Productos = this.db.collection<Producto>('Productos', ref=> ref.orderBy('IdProducto'));

    this.ProductosFB = this.Productos.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
   }


   getProductos(idNegocio){
    this.Productos = this.db.collection<Producto>('Productos', ref=> ref.where('IdNegocio','==',parseInt(idNegocio)).orderBy('IdProducto'));

    return this.Productos.valueChanges()
  }

  getProducto(idProducto){
    this.Productos = this.db.collection<Producto>('Productos', ref=> ref.where('IdProducto','==',parseInt(idProducto)));

    return this.Productos.valueChanges()
  }
}
