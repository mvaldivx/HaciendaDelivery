import { Injectable } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(
    private configuracion: ConfiguracionComponent,
    private transfer: FileTransfer
  ) { }

  uploadProductImage(img, options){
    const FileTransfer: FileTransferObject = this.transfer.create();
    return FileTransfer.upload(img, this.configuracion.ipServidorImagenes + 'uploadProductImage.php', options)
    //return this.configuracion.claimImage(req, 'uploadProductImage.php')
  }

  uploadLogoImage(img,options){
    const FileTransfer: FileTransferObject = this.transfer.create();
    return FileTransfer.upload(img, this.configuracion.ipServidorImagenes + 'uploadLogoImage.php', options)
  }

}
