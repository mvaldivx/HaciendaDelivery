import { Component, OnInit, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { ActionSheetController, Events } from '@ionic/angular';
import { AnunciosService } from '../../../Api/Services/Anuncios/anuncios.service'
import { UtilsComponent } from '../../../utils/utils.component'

@Component({
  selector: 'app-nuevo-anuncio',
  templateUrl: './nuevo-anuncio.component.html',
  styleUrls: ['./nuevo-anuncio.component.scss'],
})


export class NuevoAnuncioComponent implements OnInit {
@Input() misNegocios:any[];
@Input() Usuario:{};
CategoriaSelect = ''
CategoriaInput = ''
NegocioSelect= ''
NegocioInput = ''
ProductoInput=''
DescripcionInput=''
precioInput=0
PrecioVariable = false
rangoinferior=0
rangoSuperior= 0
imgloaded
isLoading = false
Categorias=[{Id:0,Categoria:''}]


  constructor(
    private camera: Camera,
    private file:File,
    private actionSheetController: ActionSheetController,
    private crop: Crop,
    private AnunciosServ: AnunciosService,
    private utils: UtilsComponent,
    private events: Events
    ) { }

  ngOnInit() {
    this.getCategorias()
  }

  getCategorias(){
    this.AnunciosServ.getCategorias().subscribe(cat=>{
      this.Categorias = cat
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
      quality: 100,
      sourceType:sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imgData)=>{
      this.cropImage(imgData)
      console.log(imgData)
    },err=>{

    })
  }

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50, targetWidth: 200, targetHeight: 50 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }

  showCroppedImage(ImagePath) {
    this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.imgloaded = base64;
      this.isLoading = false;
    }, error => {
      alert('Error in showing image' + error);
      this.isLoading = false;
    });
  }

  guardaAnuncio(){
    var validaCampos = this.validaCampos()
    if(validaCampos.state){
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
        if(res.success)
          this.events.publish('anuncios:insertado')
        this.utils.showToast(res.message)
      },err=>{
        console.log(err)
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


}
