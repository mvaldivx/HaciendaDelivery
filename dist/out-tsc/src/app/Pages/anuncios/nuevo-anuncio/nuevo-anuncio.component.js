import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Camera } from '@ionic-native/Camera/ngx';
import { ActionSheetController, Events } from '@ionic/angular';
import { AnunciosService } from '../../../Api/Services/Anuncios/anuncios.service';
import { UtilsComponent } from '../../../utils/utils.component';
import { ImagenesService } from '../../../Api/Services/Imagenes/imagenes.service';
import { File } from '@ionic-native/file/ngx';
let NuevoAnuncioComponent = class NuevoAnuncioComponent {
    constructor(camera, file, actionSheetController, AnunciosServ, utils, events, imagenServ) {
        this.camera = camera;
        this.file = file;
        this.actionSheetController = actionSheetController;
        this.AnunciosServ = AnunciosServ;
        this.utils = utils;
        this.events = events;
        this.imagenServ = imagenServ;
        this.CategoriaSelect = '';
        this.CategoriaInput = '';
        this.NegocioSelect = '';
        this.NegocioInput = '';
        this.ProductoInput = '';
        this.DescripcionInput = '';
        this.precioInput = 0;
        this.PrecioVariable = false;
        this.rangoinferior = 0;
        this.rangoSuperior = 0;
        this.imgloaded = false;
        this.isLoading = false;
        this.Categorias = [{ Id: 0, Categoria: '' }];
    }
    ngOnInit() {
        this.getCategorias().then(() => {
            if (this.EditAdSelected.edit) {
                this.getInfoAEditar();
            }
        });
    }
    getInfoAEditar() {
        this.AnunciosServ.getinfoAnuncio(this.EditAdSelected).subscribe(res => {
            var anuncio = res[0];
            this.NegocioSelect = parseInt(anuncio.IdNegocio).toString();
            this.ProductoInput = anuncio.Producto;
            this.DescripcionInput = anuncio.Descripcion;
            console.log(anuncio, this.misNegocios);
        });
    }
    getCategorias() {
        return new Promise(resolve => {
            this.AnunciosServ.getCategorias().subscribe(cat => {
                this.Categorias = cat;
                resolve(true);
            }, err => resolve(false));
        });
    }
    selectImage() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const actionSheet = yield this.actionSheetController.create({
                header: "Select Image source",
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
            allowEdit: true,
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
            this.file.readAsDataURL(path, filename).then(res => this.imagePath = res);
            //this.cropImage(imgData)
        }, err => {
        });
    }
    imgLoadedf() {
        this.imgloaded = true;
    }
    guardaAnuncio() {
        var validaCampos = this.validaCampos();
        if (validaCampos.state && !this.isLoading) {
            this.isLoading = true;
            var info = {
                IdUsuario: this.Usuario['IdUsuario'],
                Negocio: (this.NegocioSelect != 'Otro') ? this.NegocioSelect : this.NegocioInput,
                Categoria: (this.CategoriaSelect != 'Otra') ? this.CategoriaSelect : this.CategoriaInput,
                Precio: (this.PrecioVariable) ? this.rangoinferior + '-' + this.rangoSuperior : this.precioInput,
                Producto: this.ProductoInput,
                Descripcion: this.DescripcionInput,
                Estatus: 0,
                Comentarios: ''
            };
            this.AnunciosServ.NuevoAnuncio(info).subscribe(res => {
                if (res.success) {
                    //guarda imagen
                    let options = {
                        fileKey: 'photo',
                        fileName: res.IdProducto,
                        chunkedMode: false,
                        httpMethod: 'post',
                        mimeType: 'image/jpeg',
                        params: { ruta: './resources/Images/Productos/',
                            IdNegocio: (this.NegocioSelect != 'Otro') ? this.NegocioSelect : res.IdNegocio,
                            nombre: res.IdProducto },
                        headers: {}
                    };
                    this.imagenServ.uploadProductImage(this.imagePath, options).then(res => {
                        this.events.publish('anuncios:insertado');
                    });
                }
                else {
                    this.isLoading = false;
                    this.utils.showToast(res.message);
                }
            }, err => {
                console.log(err);
                this.isLoading = false;
                this.utils.showToast('Ocurrio un error al guardar');
            });
        }
        else {
            this.utils.showToast(validaCampos.comment);
        }
    }
    validaCampos() {
        // Campo Categoria
        if (this.CategoriaSelect != '') {
            if (this.CategoriaSelect === 'Otra')
                if (!(this.CategoriaInput != ''))
                    return { state: false, comment: 'Es necesario que ingrese la categoria' };
        }
        else {
            return { state: false, comment: 'Es necesario que seleccione la categoria' };
        }
        // Campo Negocio
        if (this.NegocioSelect != '') {
            if (this.NegocioSelect === 'Otro')
                if (!(this.NegocioInput != ''))
                    return { state: false, comment: 'Es necesario que ingrese el nombre del negocio' };
        }
        else {
            return { state: false, comment: 'Es necesario que seleccione el negocio' };
        }
        // Campo Nombre
        if (!(this.ProductoInput != ''))
            return { state: false, comment: 'Es necesario que ingrese el nombre' };
        // Campo Descripcion
        if (!(this.DescripcionInput != ''))
            return { state: false, comment: 'Es necesario que ingrese la descripcion' };
        //Campo PrecioVariable
        if (this.PrecioVariable) {
            if (isNaN(this.rangoinferior) || isNaN(this.rangoSuperior))
                return { state: false, comment: 'Es necesario que ingrese el rango inferior y superior del precio' };
        }
        else {
            if (isNaN(this.precioInput) || !(this.precioInput != 0))
                return { state: false, comment: 'Es necesario que ingrese el precio' };
        }
        return { state: true, comment: '' };
    }
    NegocioSelected() {
        if (this.NegocioSelect != 'Otro') {
            this.CategoriaSelect = this.misNegocios.filter(neg => neg.IdNegocio === this.NegocioSelect).map(n => n.IdCategoria)[0];
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], NuevoAnuncioComponent.prototype, "misNegocios", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NuevoAnuncioComponent.prototype, "Usuario", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NuevoAnuncioComponent.prototype, "EditAdSelected", void 0);
NuevoAnuncioComponent = tslib_1.__decorate([
    Component({
        selector: 'app-nuevo-anuncio',
        templateUrl: './nuevo-anuncio.component.html',
        styleUrls: ['./nuevo-anuncio.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Camera,
        File,
        ActionSheetController,
        AnunciosService,
        UtilsComponent,
        Events,
        ImagenesService])
], NuevoAnuncioComponent);
export { NuevoAnuncioComponent };
//# sourceMappingURL=nuevo-anuncio.component.js.map