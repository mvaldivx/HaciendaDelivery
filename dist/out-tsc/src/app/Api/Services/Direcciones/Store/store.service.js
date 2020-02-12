import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let StoreDireccionesService = class StoreDireccionesService {
    constructor() {
        this._direcciones = new BehaviorSubject([{
                IdDireccion: 0,
                IdUsuario: 0,
                Calle: '',
                Numero: '',
                Latitud: 0,
                Longitud: 0,
                selected: 0
            }]);
        this.direcciones$ = this._direcciones.asObservable();
        this.direccion$ = this.direcciones$;
        this._selectedDir = new BehaviorSubject({
            IdDireccion: 0,
            IdUsuario: 0,
            Calle: '',
            Numero: '',
            Latitud: 0,
            Longitud: 0,
            selected: 0
        });
        this.selectedDir$ = this._selectedDir.asObservable();
        this.selectedDireccion$ = this.selectedDir$;
    }
    get direcciones() {
        return this._direcciones.getValue();
    }
    set direcciones(val) {
        this._direcciones.next(val);
        val.forEach(dir => {
            if (dir.selected === 1) {
                this.selectedDir = dir;
            }
        });
    }
    get selectedDir() {
        return this._selectedDir.getValue();
    }
    set selectedDir(val) {
        this._selectedDir.next(val);
    }
};
StoreDireccionesService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], StoreDireccionesService);
export { StoreDireccionesService };
//# sourceMappingURL=store.service.js.map