import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Negocio {
  IdCategoria: number;
  IdNegocio: number
  Negocio: string;
  Estatus: boolean;
  Descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class NegociosService {
  private Negocios:AngularFirestoreCollection<Negocio>;
  private NegociosFB: Observable<Negocio[]>;

  constructor(private db: AngularFirestore) {
    this.Negocios = this.db.collection<Negocio>('Negocios', ref=> ref.orderBy('IdNegocio'));

    this.NegociosFB = this.Negocios.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
   }

   getNegocios(idCategoria){
    this.Negocios = this.db.collection<Negocio>('Negocios', ref=> ref.where('IdCategoria','==',parseInt(idCategoria)).orderBy('IdNegocio'));

    return this.Negocios.valueChanges()
  }

}
