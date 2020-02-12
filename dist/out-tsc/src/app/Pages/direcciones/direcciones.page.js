import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DireccionesService } from '../../Api/Services/Direcciones/direcciones.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { UbicacionPage } from '../ubicacion/ubicacion.page';
import { StoreDireccionesService } from '../../Api/Services/Direcciones/Store/store.service';
let DireccionesPage = class DireccionesPage {
    constructor(direccionesService, storage, modalCtrl, StoreDirecciones) {
        this.direccionesService = direccionesService;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.StoreDirecciones = StoreDirecciones;
        this.IdUsuario = 0;
    }
    ngOnInit() {
        this.GetDirecciones();
    }
    GetDirecciones() {
        this.storage.get('Usuario').then(usr => {
            if (usr) {
                this.IdUsuario = usr.IdUsuario;
                this.direccionesService.getDirecciones(usr.IdUsuario).subscribe(d => {
                    this.StoreDirecciones.direcciones = d;
                    this.direcciones = d;
                });
            }
            else {
                this.storage.get('ubicacion').then(u => {
                    if (u) {
                        u.selected = 1;
                        this.StoreDirecciones.selectedDir = u;
                    }
                });
            }
        });
    }
    Mapa() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalCtrl.create({
                component: UbicacionPage,
                cssClass: 'my-custom-modal-css'
            });
            yield modal.present();
            yield modal.onWillDismiss().then(r => {
                if (this.IdUsuario != 0 && r.data) {
                    var exist = false;
                    var IdDirDefault = -1;
                    var IdDirDefaultSelected = -1;
                    this.StoreDirecciones.direcciones.forEach(d => {
                        if (d.Calle === r.data.calle && d.Numero === r.data.numero) {
                            exist = true;
                            IdDirDefaultSelected = d.IdDireccion;
                        }
                        if (d.selected) {
                            IdDirDefault = d.IdDireccion;
                        }
                    });
                    if (!exist) {
                        var aux = {
                            Calle: r.data.Calle,
                            IdUsuario: this.IdUsuario,
                            Latitud: r.data.lat,
                            Longitud: r.data.lng,
                            Numero: r.data.Numero,
                            selected: 1
                        };
                        this.direccionesService.AgregaDireccion(aux).subscribe((res) => {
                            this.direccionesService.CabiarEstatusDefault(this.IdUsuario, IdDirDefault, 0).subscribe(() => {
                                this.GetDirecciones();
                            });
                            /*console.log(res)
                            this.direccionesService.CabiarEstatusDefault(this.IdUsuario,IdDirDefault,false)*/
                        });
                    }
                    else {
                        this.direccionesService.CabiarEstatusDefault(this.IdUsuario, IdDirDefault, 0).subscribe();
                        this.direccionesService.CabiarEstatusDefault(this.IdUsuario, IdDirDefaultSelected, 1).subscribe(() => {
                            this.GetDirecciones();
                        });
                    }
                }
                else {
                    this.storage.get('ubicacion').then(u => {
                        if (u) {
                            u.selected = 1;
                            this.StoreDirecciones.selectedDir = u;
                        }
                        else {
                            var direccionSt = {
                                IdDireccion: -1,
                                Calle: r.data.Calle,
                                IdUsuario: this.IdUsuario,
                                Latitud: r.data.lat,
                                Longitud: r.data.lng,
                                Numero: r.data.Numero,
                                selected: 1
                            };
                            this.storage.set('ubicacion', direccionSt);
                            this.StoreDirecciones.selectedDir = direccionSt;
                        }
                    });
                }
            });
        });
    }
    cambiaDefault(direccion) {
        if (this.IdUsuario > 0) {
            var noModificar = false;
            this.StoreDirecciones.direcciones.forEach(dir => {
                if (dir != direccion && dir.selected === 1) {
                    this.direccionesService.CabiarEstatusDefault(this.IdUsuario, dir.IdDireccion, 0).subscribe();
                }
                else if (dir === direccion && dir.selected === 1) {
                    noModificar = true;
                }
            });
            if (!noModificar) {
                this.direccionesService.CabiarEstatusDefault(this.IdUsuario, direccion.IdDireccion, (direccion.selected === 1 ? 0 : 1)).subscribe(() => {
                    this.GetDirecciones();
                });
            }
        }
    }
    remove(direccion) {
        if (this.IdUsuario > 0) {
            if (direccion.selected === 1)
                this.StoreDirecciones.selectedDir = {
                    IdDireccion: 0,
                    IdUsuario: 0,
                    Calle: '',
                    Numero: '',
                    Latitud: 0,
                    Longitud: 0,
                    selected: 0
                };
            this.direccionesService.EliminarDireccion(this.IdUsuario, direccion.IdDireccion).subscribe();
            this.StoreDirecciones.direcciones.splice(this.StoreDirecciones.direcciones.indexOf(direccion), 1);
        }
    }
};
DireccionesPage = tslib_1.__decorate([
    Component({
        selector: 'app-direcciones',
        templateUrl: './direcciones.page.html',
        styleUrls: ['./direcciones.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [DireccionesService,
        Storage,
        ModalController,
        StoreDireccionesService])
], DireccionesPage);
export { DireccionesPage };
//# sourceMappingURL=direcciones.page.js.map