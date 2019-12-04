import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface direcciones {
  Id: string;
  IdDireccion: number;
  IdUsuario: number;
  Calle: string;
  Numero: string;
  Latitud: number;
  Longitud: number;
  selected: boolean;
}

export interface idDireccion{
  IdDireccion: string;
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
    this.Direcciones = this.db.collection<direcciones>('Direcciones', ref=> ref.where('IdUsuario','==',parseInt(idUsuario)));
    this.DireccionesFB = this.Direcciones.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
    return this.DireccionesFB
  }

  buscaDireccionReplicada(IdUsuario,calle, numero){
    this.Direcciones = this.db.collection<direcciones>('Direcciones', ref => ref.where('IdUsuario','==',parseInt(IdUsuario))
                        .where('Calle','==',calle).where('Numero','==',numero))

    return this.Direcciones.valueChanges()
  }

  getUltimoIdDireccion(){
    return  this.db.collection<idDireccion>('Direcciones', ref=> ref.orderBy('IdDireccion','desc').limit(1)).valueChanges();
  }

  getDireccionActual(idUsuario){
    this.Direcciones = this.db.collection<direcciones>('Direcciones', ref=> ref.where('IdUsuario','==',parseInt(idUsuario)).where('selected','==',true));
    this.DireccionesFB = this.Direcciones.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
    return this.DireccionesFB
  }

  AgregaDireccion(dir){
    return this.Direcciones.add(dir);
  }


  CabiarEstatusDefault(idUsuario, IdDireccion: string, select){
    return this.db.collection<direcciones>('Direcciones', ref=> ref.where('IdUsuario','==',parseInt(idUsuario))
                        ).doc(IdDireccion).update({selected:select})
    
  }

}
