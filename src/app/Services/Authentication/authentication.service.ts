import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Usuario {
  IdUsuario: number;
  Nombre: string;
  UID: string;
  telefono: string;
  registradoEl: Date;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private Usuarios:AngularFirestoreCollection<Usuario>;
  private UsuariosFB: Observable<Usuario[]>;

  constructor(
    private db: AngularFirestore
  ) { 
    this.Usuarios = this.db.collection<Usuario>('Usuarios', ref=> ref.orderBy('IdUsuario'));

    this.UsuariosFB = this.Usuarios.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
  }

  getUsuario(UID){
    this.Usuarios = this.db.collection<Usuario>('Usuarios', ref=> ref.where('UID','==',UID));

    return this.Usuarios.valueChanges();
  }

  getUsuarios(){
    return this.Usuarios.valueChanges();
  }
}
