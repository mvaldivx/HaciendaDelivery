import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ActionSheetController, Events } from '@ionic/angular';
import { AnunciosService } from '../../../Api/Services/Anuncios/anuncios.service'
import { UtilsComponent } from '../../../utils/utils.component'
import { ImagenesService } from '../../../Api/Services/Imagenes/imagenes.service'
import { FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file/ngx';

export interface editAd{
  edit: boolean;
  IdProducto: number;
  IdNegocio: number;
}

@Component({
  selector: 'app-nuevo-anuncio',
  templateUrl: './nuevo-anuncio.component.html',
  styleUrls: ['./nuevo-anuncio.component.scss'],
})


export class NuevoAnuncioComponent implements OnInit {
@Input() misNegocios:any[];
@Input() Usuario:{};
@Input() EditAdSelected:editAd;
CategoriaSelect = ''
CategoriaInput = ''
NegocioSelect
NegocioInput = ''
ProductoInput=''
DescripcionInput=''
precioInput=0
PrecioVariable = false
rangoinferior=0
rangoSuperior= 0
imgloaded = false
isLoading = false
Categorias=[{Id:0,Categoria:''}]
imagePath



  constructor(
    private camera: Camera,
    private file:File,
    private actionSheetController: ActionSheetController,
    private AnunciosServ: AnunciosService,
    private utils: UtilsComponent,
    private events: Events,
    private imagenServ: ImagenesService
    ) { 
     
    }

  ngOnInit() {
    this.getCategorias().then(()=>{
      if(this.EditAdSelected.edit){
        this.getInfoAEditar()
      }
    })
    
  }

  getInfoAEditar(){
    this.AnunciosServ.getinfoAnuncio(this.EditAdSelected).subscribe(res=>{
       var anuncio =  res[0]
       this.NegocioSelect = parseInt(anuncio.IdNegocio)
       this.ProductoInput = anuncio.Producto
       this.DescripcionInput = anuncio.Descripcion
       this.precioInput = anuncio.Precio
        console.log(anuncio, this.misNegocios);
        
    })
  }

  getCategorias(){
    return new Promise<boolean>(resolve =>{
      this.AnunciosServ.getCategorias().subscribe(cat=>{
        this.Categorias = cat
        resolve(true)
      }, err=> resolve(false))
    })
  }

  
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
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
    await actionSheet.present();
  }


  pickImage(sourceType){
    const options: CameraOptions={
      quality: 80,
      allowEdit: true,
      sourceType:sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imgData)=>{
      var imagePath = imgData.split('?')[0]
      let filename = imagePath.substring(imagePath.lastIndexOf('/')+1);
      let path =  imagePath.substring(0,imagePath.lastIndexOf('/')+1);
      //then use the method reasDataURL  btw. var_picture is ur image variable
      this.file.readAsDataURL(path, filename).then(res=> this.imagePath = res  );
      //this.cropImage(imgData)
    },err=>{

    })
  }

  imgLoadedf(){
    this.imgloaded = true
  }

  guardaAnuncio(){
    var validaCampos = this.validaCampos()
    if(validaCampos.state && !this.isLoading){
      this.isLoading = true
      
      var info = {
        IdUsuario: this.Usuario['IdUsuario'],
        Negocio: (this.NegocioSelect != 'Otro') ? this.NegocioSelect : this.NegocioInput,
        Categoria: (this.CategoriaSelect != 'Otra')? this.CategoriaSelect : this.CategoriaInput,
        Precio: (this.PrecioVariable)?this.rangoinferior+'-'+this.rangoSuperior: this.precioInput,
        Producto: this.ProductoInput,
        Descripcion: this.DescripcionInput,
        Estatus: 0,
        Comentarios: ''
      }
      this.AnunciosServ.NuevoAnuncio(info).subscribe(res=>{
        if(res.success){
          //guarda imagen
          let options: FileUploadOptions = {
            fileKey: 'photo',
            fileName: res.IdProducto,
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: 'image/jpeg',
            params:{ruta: './resources/Images/Productos/',
              IdNegocio:(this.NegocioSelect != 'Otro') ? this.NegocioSelect : res.IdNegocio,
              nombre:res.IdProducto},
            headers:{}
          }
          this.imagenServ.uploadProductImage(this.imagePath,options).then(res=>{
            this.events.publish('anuncios:insertado')
          })
        }else{
          this.isLoading = false
          this.utils.showToast(res.message)
        }
          
        
      },err=>{
        console.log(err)
        this.isLoading = false
        this.utils.showToast('Ocurrio un error al guardar')
      })
    }else{
      
      this.utils.showToast(validaCampos.comment)
    }
  }

  validaCampos(){
    // Campo Categoria
    if(this.CategoriaSelect != ''){
      if(this.CategoriaSelect === 'Otra')
        if(!(this.CategoriaInput != ''))
          return {state:false, comment: 'Es necesario que ingrese la categoria'}
    }else{
      return {state:false, comment: 'Es necesario que seleccione la categoria'}
    }
    // Campo Negocio
    if(this.NegocioSelect != ''){
      if(this.NegocioSelect === 'Otro')
        if(!(this.NegocioInput != ''))
        return {state:false, comment: 'Es necesario que ingrese el nombre del negocio'}
    }else{
      return {state:false, comment: 'Es necesario que seleccione el negocio'}
    }
    // Campo Nombre
    if(!(this.ProductoInput != ''))
      return {state:false, comment: 'Es necesario que ingrese el nombre'}
    // Campo Descripcion
    if(!(this.DescripcionInput != ''))
      return {state:false, comment: 'Es necesario que ingrese la descripcion'}
    
    //Campo PrecioVariable
    if(this.PrecioVariable){
      if(isNaN(this.rangoinferior) || isNaN(this.rangoSuperior))
        return {state:false, comment: 'Es necesario que ingrese el rango inferior y superior del precio'}
    }else{
      if(isNaN(this.precioInput) || !(this.precioInput != 0))
        return {state:false, comment: 'Es necesario que ingrese el precio'}
    }
    
    return {state:true, comment: ''}
  }

  NegocioSelected(){
    if(this.NegocioSelect != 'Otro'){
      this.CategoriaSelect = this.misNegocios.filter(neg => neg.IdNegocio === this.NegocioSelect).map(n=>n.IdCategoria)[0]
    }
    
  }


}
