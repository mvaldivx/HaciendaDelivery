import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Events, NavController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UtilsComponent } from '../../utils/utils.component';
import { AuthenticationService } from '../../Api/Services/Authentication/authentication.service';
import { Storage } from '@ionic/storage';
import { StoreDireccionesService } from '../../Api/Services/Direcciones/Store/store.service';
import { DireccionesService } from '../../Api/Services/Direcciones/direcciones.service';
let RegistroPage = class RegistroPage {
    constructor(route, utils, AuthService, storage, events, location, navCtrl, StoreDirecciones, direccionesService) {
        this.route = route;
        this.utils = utils;
        this.AuthService = AuthService;
        this.storage = storage;
        this.events = events;
        this.location = location;
        this.navCtrl = navCtrl;
        this.StoreDirecciones = StoreDirecciones;
        this.direccionesService = direccionesService;
        this.phoneNumber = "";
        this.UID = "";
        this.Nombre = "";
        this.Dia = -1;
        this.Mes = -1;
        this.Anio = -1;
        this.Meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        this.Meses30 = [3, 5, 8, 10];
        this.Meses31 = [0, 2, 4, 6, 7, 9, 11];
    }
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.phoneNumber = params["phoneNumber"];
            this.UID = params["uid"];
        });
        this.GeneraDias(31);
        this.GeneraAnios();
    }
    close() {
        this.location.back();
        // this.navCtrl.back()
    }
    GeneraDias(max) {
        var aux = [];
        for (var i = 1; i <= max; i++) {
            aux.push(i);
        }
        this.Dias = aux;
    }
    GeneraAnios() {
        var years = [];
        for (var i = (new Date().getFullYear() - 10); i >= 1900; i--) {
            years.push(i);
        }
        this.Anios = years;
    }
    RegistrarUsuario() {
        if (this.Nombre != "" && this.Dia > -1 && this.Mes > -1 && this.Anio > -1) {
            var FechaNacimiento = new Date(this.Anio, this.Mes, this.Dia);
            this.Usuario = {
                IdUsuario: 0,
                Nombre: this.Nombre,
                UID: this.UID,
                registradoEl: new Date(),
                FechaNacimiento: FechaNacimiento,
                telefono: this.phoneNumber
            };
            this.AuthService.registrarUsuario({ usuario: this.Usuario }).subscribe(res => {
                this.guardaDireccionSiExiste(res.insertId);
                this.Usuario.IdUsuario = res.insertId;
                this.storage.set('Usuario', this.Usuario);
                this.utils.showToast('Registrado Correctamente');
                this.navCtrl.navigateRoot('');
                this.events.publish('user:register');
            }).unsubscribe;
            //(()=>{
            //   this.utils.showToast(error)
            // })
        }
        else {
            this.utils.alertGenerico('Error', 'Para continuar es necesario que complete el formulario');
        }
    }
    guardaDireccionSiExiste(idusuario) {
        if (this.StoreDirecciones.selectedDir.Calle != '') {
            var aux = {
                Calle: this.StoreDirecciones.selectedDir.Calle,
                IdUsuario: idusuario,
                Latitud: this.StoreDirecciones.selectedDir.Latitud,
                Longitud: this.StoreDirecciones.selectedDir.Longitud,
                Numero: this.StoreDirecciones.selectedDir.Numero,
                selected: 1
            };
            this.direccionesService.AgregaDireccion(aux).subscribe();
        }
    }
    ChangeYear() {
        if (this.Mes === 1) {
            this.validaAnioBisiesto();
        }
    }
    ChangeMonth() {
        if (this.Mes >= 0) {
            if (this.Mes === 1) {
                if (this.Anio != -1) {
                    this.validaAnioBisiesto();
                }
                else {
                    this.validaDias(28);
                }
            }
            else if (this.Meses31.includes(this.Mes)) {
                this.validaDias(31);
            }
            else {
                this.validaDias(30);
            }
        }
    }
    validaAnioBisiesto() {
        if (((this.Anio % 4 == 0 && this.Anio % 100 != 0) || (this.Anio % 100 == 0 && this.Anio % 400 == 0))) {
            this.validaDias(29);
        }
        else {
            this.validaDias(28);
        }
    }
    validaDias(dias) {
        if (this.Dia >= 1) {
            if (this.Dia > dias) {
                this.Dia = -1;
            }
        }
        this.GeneraDias(dias);
    }
};
RegistroPage = tslib_1.__decorate([
    Component({
        selector: 'app-registro',
        templateUrl: './registro.page.html',
        styleUrls: ['./registro.page.scss'],
        animations: [
            trigger('fadein', [
                state('void', style({ opacity: 0, left: '-1000px' })),
                transition('void =>*', [
                    style({ opacity: 1 }),
                    animate('600ms ease-out', style({ left: 0 }))
                ])
            ])
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        UtilsComponent,
        AuthenticationService,
        Storage,
        Events,
        Location,
        NavController,
        StoreDireccionesService,
        DireccionesService])
], RegistroPage);
export { RegistroPage };
//# sourceMappingURL=registro.page.js.map