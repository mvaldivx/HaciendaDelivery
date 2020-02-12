import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
let AuthenticationService = class AuthenticationService {
    constructor(configuracion) {
        this.configuracion = configuracion;
    }
    getUsuario(UID) {
        return this.configuracion.claim('Auth', 'getUsuario', UID);
    }
    /*getUsuarios(){
      return this.Usuarios.valueChanges();
    }
  
    getUltimoIdUsuario(){
      return  this.db.collection<idUsuario>('Usuarios', ref=> ref.orderBy('IdUsuario','desc').limit(1)).valueChanges();
      
    }*/
    registrarUsuario(Usuario) {
        return this.configuracion.claimPost('Auth', 'registrarUsuario', Usuario);
    }
    getPlayerId(playerId) {
        return this.configuracion.claim('Auth', 'getPlayerId', playerId);
        /*this.PlayerId = this.db.collection<PlayerId>('PlayerId',ref => ref.where('IdUsuario','==',playerId.IdUsuario));
        return this.PlayerId.valueChanges()*/
    }
    InsertPlayerId(playerId) {
        return this.configuracion.claimPost('Auth', 'InsertPlayerId', playerId);
        //return this.PlayerId.add(playerId);
    }
};
AuthenticationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ConfiguracionComponent])
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map