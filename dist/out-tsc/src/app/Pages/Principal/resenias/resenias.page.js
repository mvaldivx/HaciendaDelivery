import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CalificacionesService } from '../../../Api/Services/Calificaciones/calificaciones.service';
import { PrincipalComponent } from '../../../Api/Principal/principal/principal.component';
let ReseniasPage = class ReseniasPage {
    constructor(modalCtrl, navParams, CalificacionesServ, productos) {
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.CalificacionesServ = CalificacionesServ;
        this.productos = productos;
        this.IdNegocio = 0;
        this.loading = true;
        this.Resenias = [];
        this.meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    }
    ngOnInit() {
        this.IdNegocio = this.navParams.get('IdNegocio');
        this.ObtieneResenias();
    }
    close() {
        this.modalCtrl.dismiss();
    }
    ObtieneResenias() {
        this.CalificacionesServ.getResenias(this.IdNegocio).subscribe(res => {
            var auxProd = [];
            res.sort(function (a, b) { return b.Fecha['seconds'] - a.Fecha['seconds']; });
            res.forEach(el => {
                var aux = { IdNegocio: 0, Calificacion: [], Comentario: '', IdUsuario: 0, Fecha: '', Nombre: '' };
                var dat = new Date(el.Fecha);
                var fecha = dat.toLocaleDateString("en-US").split('/');
                aux.IdNegocio = el.IdNegocio;
                aux.Calificacion = this.getCalificacion(el.Calificacion);
                aux.Comentario = el.Comentario;
                aux.IdUsuario = el.IdUsuario;
                aux.Nombre = el.Nombre;
                aux.Fecha = fecha[1] + ' ' + this.meses[parseInt(fecha[0]) - 1] + ' ' + fecha[2] + '  ' + this.getHora(dat.getHours()) + ':' + dat.getMinutes() + ' ' + ((dat.getHours() >= 12) ? 'PM' : 'AM');
                auxProd.push(aux);
            });
            this.Resenias = auxProd;
            this.loading = false;
        });
    }
    getCalificacion(calificacion) {
        var aux = [];
        var medio = false;
        for (let i = 1; i <= 5; i++) {
            let t = 1;
            if (calificacion >= i) {
                t = 1;
            }
            else {
                if (this.isInt(calificacion) || medio) {
                    t = 3;
                }
                else {
                    t = 2;
                    medio = true;
                }
            }
            aux.push({ t: t });
        }
        return aux;
    }
    isInt(n) {
        return (n % 1 === 0) ? true : false;
    }
    getHora(hora) {
        if (hora <= 12) {
            return hora;
        }
        else {
            return hora - 12;
        }
    }
};
ReseniasPage = tslib_1.__decorate([
    Component({
        selector: 'app-resenias',
        templateUrl: './resenias.page.html',
        styleUrls: ['./resenias.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ModalController,
        NavParams,
        CalificacionesService,
        PrincipalComponent])
], ReseniasPage);
export { ReseniasPage };
//# sourceMappingURL=resenias.page.js.map