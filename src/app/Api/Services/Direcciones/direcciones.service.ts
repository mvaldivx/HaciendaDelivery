import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfiguracionComponent } from 'src/app/Configuracion/configuracion/configuracion.component';


export interface direcciones {
  IdDireccion: number;
  IdUsuario: number;
  Calle: string;
  Numero: string;
  Latitud: number;
  Longitud: number;
  selected: number;
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
    private db: AngularFirestore,
    private configuracion: ConfiguracionComponent
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

  getDirecciones(idUsuario): Observable<any>{
    return this.configuracion.claim('Direcciones','getDirecciones',{IdUsuario: idUsuario})
    /*this.Direcciones = this.db.collection<direcciones>('Direcciones', ref=> ref.where('IdUsuario','==',parseInt(idUsuario)));
    this.DireccionesFB = this.Direcciones.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
    return this.DireccionesFB*/
  }

  buscaDireccionReplicada(IdUsuario,calle, numero): Observable<any>{
    return this.configuracion.claim('Direcciones','buscaDireccionReplicada',{IdUsuario: IdUsuario,Calle: calle, Numero: numero})
    /*this.Direcciones = this.db.collection<direcciones>('Direcciones', ref => ref.where('IdUsuario','==',parseInt(IdUsuario))
                        .where('Calle','==',calle).where('Numero','==',numero))

    return this.Direcciones.valueChanges()*/
  }

  getDireccionActual(idUsuario): Observable<any>{
    return this.configuracion.claim('Direcciones','getDireccionActual',{IdUsuario: idUsuario})
    /*this.Direcciones = this.db.collection<direcciones>('Direcciones', ref=> ref.where('IdUsuario','==',parseInt(idUsuario)).where('selected','==',true));
    this.DireccionesFB = this.Direcciones.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
    return this.DireccionesFB*/
  }

  AgregaDireccion(dir): Observable<any>{
    return this.configuracion.claimPost('Direcciones','AgregaDireccion',dir)
    //return this.Direcciones.add(dir);
  }


  CabiarEstatusDefault(idUsuario, IdDireccion, select): Observable<any>{
    return this.configuracion.claimPost('Direcciones','CambiarEstatusDefault',{selected: select,IdUsuario: idUsuario, IdDireccion: IdDireccion})
    /*return this.db.collection<direcciones>('Direcciones', ref=> ref.where('IdUsuario','==',parseInt(idUsuario))
                        ).doc(IdDireccion).update({selected:select})*/
    
  }

  EliminarDireccion(idUsuario,IdDireccion): Observable<any>{
    return this.configuracion.claimPost('Direcciones','EliminarDireccion',{IdUsuario:idUsuario,IdDireccion: IdDireccion})
  }

}
