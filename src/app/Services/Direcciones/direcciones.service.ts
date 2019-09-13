import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface direcciones {
  IdDireccion: number;
  IdUsuario: number;
  Calle: string;
  Numero: string;
  Latitud: number;
  Longitud: number;
  default: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {
  private Direcciones:AngularFirestoreCollection<direcciones>;
  private DireccionesFB: Observable<direcciones[]>;

  constructor(
    private db: AngularFirestore
  ) { 
    this.Direcciones = this.db.collection<direcciones>('Direcciones', ref=> ref.orderBy('IdDireccion'));

    this.DireccionesFB = this.Direcciones.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
  }

  getDirecciones(idUsuario){
    this.Direcciones = this.db.collection<direcciones>('Direcciones', ref=> ref.where('IdUsuario','==',parseInt(idUsuario)).orderBy('IdUsuario'));
    
    return this.Direcciones.valueChanges()
  }
}
