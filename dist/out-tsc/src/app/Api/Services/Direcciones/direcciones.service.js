import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ConfiguracionComponent } from 'src/app/Configuracion/configuracion/configuracion.component';
let DireccionesService = class DireccionesService {
    constructor(db, configuracion) {
        this.db = db;
        this.configuracion = configuracion;
        this.Direcciones = this.db.collection('Direcciones', ref => ref.orderBy('IdDireccion'));
        this.DireccionesFB = this.Direcciones.snapshotChanges().pipe(map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const Id = a.payload.doc.id;
                return Object.assign({ Id }, data);
            });
        }));
    }
    getDirecciones(idUsuario) {
        return this.configuracion.claim('Direcciones', 'getDirecciones', { IdUsuario: idUsuario });
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
    buscaDireccionReplicada(IdUsuario, calle, numero) {
        return this.configuracion.claim('Direcciones', 'buscaDireccionReplicada', { IdUsuario: IdUsuario, Calle: calle, Numero: numero });
        /*this.Direcciones = this.db.collection<direcciones>('Direcciones', ref => ref.where('IdUsuario','==',parseInt(IdUsuario))
                            .where('Calle','==',calle).where('Numero','==',numero))
    
        return this.Direcciones.valueChanges()*/
    }
    getDireccionActual(idUsuario) {
        return this.configuracion.claim('Direcciones', 'getDireccionActual', { IdUsuario: idUsuario });
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
    AgregaDireccion(dir) {
        return this.configuracion.claimPost('Direcciones', 'AgregaDireccion', dir);
        //return this.Direcciones.add(dir);
    }
    CabiarEstatusDefault(idUsuario, IdDireccion, select) {
        return this.configuracion.claimPost('Direcciones', 'CambiarEstatusDefault', { selected: select, IdUsuario: idUsuario, IdDireccion: IdDireccion });
        /*return this.db.collection<direcciones>('Direcciones', ref=> ref.where('IdUsuario','==',parseInt(idUsuario))
                            ).doc(IdDireccion).update({selected:select})*/
    }
    EliminarDireccion(idUsuario, IdDireccion) {
        return this.configuracion.claimPost('Direcciones', 'EliminarDireccion', { IdUsuario: idUsuario, IdDireccion: IdDireccion });
    }
};
DireccionesService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AngularFirestore,
        ConfiguracionComponent])
], DireccionesService);
export { DireccionesService };
//# sourceMappingURL=direcciones.service.js.map