import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss'],
})
export class UtilsComponent implements OnInit {

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  public async showToast(message){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  
  async alertGenerico(titulo,message){
    var alert =  await this.alertCtrl.create({
      header: titulo,
      message: message,
      buttons: [
        { text: 'Aceptar'
        }
      ]
    })
    alert.present()
  }

  async alertUsuario(){
    var alert =  await this.alertCtrl.create({
      header: 'Importante',
      message: 'Para Continuar es necesario iniciar sesión',
      buttons: [
        { text: 'Aceptar',
          handler: data => {
            this.navCtrl.navigateForward(['login'])
          }
        }
      ]
    })
    alert.present()
  }
}
