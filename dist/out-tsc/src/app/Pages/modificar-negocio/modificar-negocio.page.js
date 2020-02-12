import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParams, ModalController, ActionSheetController } from '@ionic/angular';
import { ConfiguracionComponent } from '../../Configuracion/configuracion/configuracion.component';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { NegociosService } from '../../Api/Services/Negocios/negocios.service';
import { UtilsComponent } from '../../utils/utils.component';
import { ImagenesService } from '../../Api/Services/Imagenes/imagenes.service';
let ModificarNegocioPage = class ModificarNegocioPage {
    constructor(NavParams, modalCtrl, configuracion, camera, file, actionSheetController, NegociosServ, Utils, imagenesServ) {
        this.NavParams = NavParams;
        this.modalCtrl = modalCtrl;
        this.configuracion = configuracion;
        this.camera = camera;
        this.file = file;
        this.actionSheetController = actionSheetController;
        this.NegociosServ = NegociosServ;
        this.Utils = Utils;
        this.imagenesServ = imagenesServ;
        this.IdNegocio = 0;
        this.rutaImagenesNegocios = '';
        this.isLoading = false;
        this.negocio = {};
        this.rutaNoImage = '';
        this.imgError = false;
        this.rutaNoImage = this.configuracion.rutaNoImage;
        this.rutaImagenesNegocios = this.configuracion.rutaImagenesLogos;
        this.IdNegocio = this.NavParams.get('IdNegocio');
    }
    ngOnInit() {
        this.getInfoNegocio();
    }
    close() {
        this.modalCtrl.dismiss();
    }
    getInfoNegocio() {
        this.NegociosServ.getInfoNegocio({ IdNegocio: this.IdNegocio }).subscribe(neg => {
            if (neg.length > 0)
                this.negocio = neg[0];
        });
    }
    selectImage() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const actionSheet = yield this.actionSheetController.create({
                buttons: [{
                        text: 'Cargar de la libreria',
                        handler: () => {
                            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
                        }
                    },
                    {
                        text: 'Usar la Camara',
                        handler: () => {
                            this.pickImage(this.camera.PictureSourceType.CAMERA);
                        }
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel'
                    }
                ]
            });
            yield actionSheet.present();
        });
    }
    pickImage(sourceType) {
        const options = {
            quality: 80,
            sourceType: sourceType,
            saveToPhotoAlbum: true,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then((imgData) => {
            var imagePath = imgData.split('?')[0];
            let filename = imagePath.substring(imagePath.lastIndexOf('/') + 1);
            let path = imagePath.substring(0, imagePath.lastIndexOf('/') + 1);
            //then use the method reasDataURL  btw. var_picture is ur image variable
            this.file.readAsDataURL(path, filename).then(res => this.loadedImage = res);
        }, err => {
        });
    }
    update() {
        if (this.negocio.Negocio != '' && !this.isLoading) {
            this.isLoading = true;
            this.NegociosServ.updateNegocio(this.negocio).subscribe(res => {
                if (res.affectedRows >= 0 || this.loadedImage) {
                    //guarda imagen
                    let options = {
                        fileKey: 'photo',
                        fileName: this.negocio.IdNegocio.toString(),
                        chunkedMode: false,
                        httpMethod: 'post',
                        mimeType: 'image/jpeg',
                        params: { ruta: './resources/Images/Logos/',
                            IdNegocio: this.negocio.IdNegocio,
                            nombre: this.negocio.IdNegocio },
                        headers: {}
                    };
                    this.imagenesServ.uploadLogoImage(this.loadedImage, options).then(res => {
                        this.isLoading = false;
                        this.Utils.showToast('Actualizacion guardada con exito');
                    });
                }
            });
        }
        else {
            this.Utils.showToast('Debe tener Nombre su Negocio');
        }
    }
};
ModificarNegocioPage = tslib_1.__decorate([
    Component({
        selector: 'app-modificar-negocio',
        templateUrl: './modificar-negocio.page.html',
        styleUrls: ['./modificar-negocio.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [NavParams,
        ModalController,
        ConfiguracionComponent,
        Camera,
        File,
        ActionSheetController,
        NegociosService,
        UtilsComponent,
        ImagenesService])
], ModificarNegocioPage);
export { ModificarNegocioPage };
//# sourceMappingURL=modificar-negocio.page.js.map