import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ActionSheetController } from '@ionic/angular'; 
import { ConfiguracionComponent } from '../../Configuracion/configuracion/configuracion.component'
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { NegociosService, Negocio } from '../../Api/Services/Negocios/negocios.service';
import { UtilsComponent } from '../../utils/utils.component';
import { ImagenesService } from '../../Api/Services/Imagenes/imagenes.service'
import { FileUploadOptions } from '@ionic-native/file-transfer';

@Component({
  selector: 'app-modificar-negocio',
  templateUrl: './modificar-negocio.page.html',
  styleUrls: ['./modificar-negocio.page.scss'],
})
export class ModificarNegocioPage implements OnInit {
IdNegocio = 0
rutaImagenesNegocios =''
imgloaded
isLoading = false
negocio: Negocio = {} as any;
rutaNoImage = ''
imgError= false
loadedImage 

  constructor(
    private NavParams: NavParams,
    private modalCtrl: ModalController,
    private configuracion : ConfiguracionComponent,
    private camera: Camera,
    private file:File,
    private actionSheetController: ActionSheetController,
    private NegociosServ: NegociosService,
    private Utils: UtilsComponent,
    private imagenesServ: ImagenesService
  ) { 
    this.rutaNoImage = this.configuracion.rutaNoImage
    this.rutaImagenesNegocios = this.configuracion.rutaImagenesLogos
    this.IdNegocio = this.NavParams.get('IdNegocio');
  }

  ngOnInit() {
    this.getInfoNegocio()
  }

  close(){
    this.modalCtrl.dismiss()
  }

  getInfoNegocio(){
    this.NegociosServ.getInfoNegocio({IdNegocio: this.IdNegocio}).subscribe(neg=>{
      if(neg.length > 0 )
        this.negocio = neg[0]
    })
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
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
      this.file.readAsDataURL(path, filename).then(res=> this.loadedImage = res  );
    },err=>{

    })
  }

 

  update(){
    if(this.negocio.Negocio != '' && !this.isLoading){
      this.isLoading = true
      this.NegociosServ.updateNegocio(this.negocio).subscribe(res=>{
        if(res.affectedRows >= 0 || this.loadedImage){
          //guarda imagen
          let options: FileUploadOptions = {
            fileKey: 'photo',
            fileName: this.negocio.IdNegocio.toString(),
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: 'image/jpeg',
            params:{ruta: './resources/Images/Logos/',
              IdNegocio:this.negocio.IdNegocio,
              nombre:this.negocio.IdNegocio},
            headers:{}
          }
          this.imagenesServ.uploadLogoImage(this.loadedImage,options).then(res=>{
            this.isLoading = false
            this.Utils.showToast('Actualizacion guardada con exito')
          })
        }
      })
    }else{
      this.Utils.showToast('Debe tener Nombre su Negocio')
    }
  }


}
