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
  FechaNacimiento: Date;
}

export interface PlayerId{
  IdUsuario: number;
  playerId: string;
}

export interface idUsuario{
  IdUsuario: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private Usuarios:AngularFirestoreCollection<Usuario>;
  private IdUsuarios: AngularFirestoreCollection<idUsuario>;
  private UsuariosFB: Observable<Usuario[]>;
  private PlayerId: AngularFirestoreCollection<PlayerId>;

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

  getUltimoIdUsuario(){
    return  this.db.collection<idUsuario>('Usuarios', ref=> ref.orderBy('IdUsuario','desc').limit(1)).valueChanges();
    
  }

  registrarUsuario(Usuario: Usuario){
      return this.Usuarios.add(Usuario);
  }

  getPlayerId(playerId: PlayerId){
    this.PlayerId = this.db.collection<PlayerId>('PlayerId',ref => ref.where('IdUsuario','==',playerId.IdUsuario));
    return this.PlayerId.valueChanges()
  }

  InsertPlayerId(playerId: PlayerId){
    return this.PlayerId.add(playerId);
  }
}
