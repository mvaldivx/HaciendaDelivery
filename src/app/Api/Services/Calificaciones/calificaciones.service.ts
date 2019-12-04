import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Calificacion {
  IdNegocio: number;
  Calificacion: number;
  Comentario: string;
  IdProducto: number;
  IdUsuario: number;
  Fecha: Date;
}

export interface CalificacionProductos{
  IdNegocio: number;
  Calificacion: number;
  Comentario: string;
  IdProducto: number;
  IdUsuario: number;
  Producto: string;
  Fecha:Date;
}
@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {
  private Calificaciones:AngularFirestoreCollection<Calificacion>;
  private CalificacionesProd:AngularFirestoreCollection<Calificacion>;
  private CalificacionesFB: Observable<Calificacion[]>;

  constructor(private db: AngularFirestore) {
    this.Calificaciones = this.db.collection<Calificacion>('Reseñas', ref=> ref.orderBy('IdNegocio'));

    this.CalificacionesFB = this.Calificaciones.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
   }

   getResenias(idNegocio){
    this.Calificaciones = this.db.collection<Calificacion>('Reseñas', ref=> ref.where('IdNegocio','==',parseInt(idNegocio)).orderBy('Fecha'));

    return this.Calificaciones.valueChanges();
  }
}
