import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
let ImagenesService = class ImagenesService {
    constructor(configuracion, transfer) {
        this.configuracion = configuracion;
        this.transfer = transfer;
    }
    uploadProductImage(img, options) {
        const FileTransfer = this.transfer.create();
        return FileTransfer.upload(img, this.configuracion.ipServidorImagenes + 'uploadProductImage.php', options);
        //return this.configuracion.claimImage(req, 'uploadProductImage.php')
    }
    uploadLogoImage(img, options) {
        const FileTransfer = this.transfer.create();
        return FileTransfer.upload(img, this.configuracion.ipServidorImagenes + 'uploadLogoImage.php', options);
    }
};
ImagenesService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ConfiguracionComponent,
        FileTransfer])
], ImagenesService);
export { ImagenesService };
//# sourceMappingURL=imagenes.service.js.map