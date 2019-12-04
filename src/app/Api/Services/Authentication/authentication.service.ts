import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'


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

  constructor(
    private configuracion: ConfiguracionComponent
  ) { 
  }

  getUsuario(UID): Observable<any>{
    return this.configuracion.claim('Auth','getUsuario',UID)
  }

  /*getUsuarios(){
    return this.Usuarios.valueChanges();
  }

  getUltimoIdUsuario(){
    return  this.db.collection<idUsuario>('Usuarios', ref=> ref.orderBy('IdUsuario','desc').limit(1)).valueChanges();
    
  }*/

  registrarUsuario(Usuario): Observable<any>{
      return this.configuracion.claimPost('Auth','registrarUsuario',Usuario)
  }

  getPlayerId(playerId: PlayerId): Observable<any>{
    return this.configuracion.claim('Auth','getPlayerId',playerId)
    /*this.PlayerId = this.db.collection<PlayerId>('PlayerId',ref => ref.where('IdUsuario','==',playerId.IdUsuario));
    return this.PlayerId.valueChanges()*/
  }

  InsertPlayerId(playerId: PlayerId): Observable<any>{
    return this.configuracion.claimPost('Auth','InsertPlayerId',playerId)
    //return this.PlayerId.add(playerId);
  }
}
