import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
let UtilsComponent = class UtilsComponent {
    constructor(toastCtrl, alertCtrl, navCtrl) {
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
    }
    ngOnInit() { }
    showToast(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastCtrl.create({
                message: message,
                duration: 2000
            });
            toast.present();
        });
    }
    alertGenerico(titulo, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var alert = yield this.alertCtrl.create({
                header: titulo,
                message: message,
                buttons: [
                    { text: 'Aceptar'
                    }
                ]
            });
            alert.present();
        });
    }
    alertUsuario() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var alert = yield this.alertCtrl.create({
                header: 'Importante',
                message: 'Para Continuar es necesario iniciar sesión',
                buttons: [
                    { text: 'Aceptar',
                        handler: data => {
                            this.navCtrl.navigateForward(['login']);
                        }
                    }
                ]
            });
            alert.present();
        });
    }
};
UtilsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-utils',
        templateUrl: './utils.component.html',
        styleUrls: ['./utils.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ToastController,
        AlertController,
        NavController])
], UtilsComponent);
export { UtilsComponent };
//# sourceMappingURL=utils.component.js.map