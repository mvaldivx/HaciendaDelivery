import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../../Services/Authentication/authentication.service'
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  codigo="+52";

  constructor(
    public navCtrl:NavController, 
    public alertCtrl:AlertController,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

 signIn(phoneNumber: number){
   if(!isNaN(phoneNumber) && this.codigo != ""){
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = this.codigo + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.presentAlert(confirmationResult)
      })
      .catch( error => {
        this.alertGenerico('Verifique el numero ingresado' + phoneNumberString + ' '  + error )
      });
   }
  }


  async presentAlert(confirmationResult){
    let aler =  await this.alertCtrl.create({
      header: 'Ingrese el codigo de confirmacion',
      inputs: [{ name: 'confirmationCode', placeholder: 'Codigo' }],
      buttons: [
        { text: 'Cancelar',
          handler: data => { console.log('Cancel clicked'); }
        },
        { text: 'Aceptar',
          handler: data => {
            this.validaCodigo(confirmationResult,data)
          }
        }
      ]
    });
    await aler.present();
  }

  validaCodigo(confirmationResult, data){
    confirmationResult.confirm(data.confirmationCode)
    .then( result => {
      // User signed in successfully.
      this.GetUserData(result.user.uid)
      // ...
    }).catch( error => {
      this.alertGenerico('Codigo incorrecto' + ' ' + error)
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  async alertGenerico(message){
    var alert =  await this.alertCtrl.create({
      header: message,
      buttons: [
        { text: 'Aceptar'
        }
      ]
    })
    alert.present()
  }

  close(){
    this.navCtrl.back()
  }

  GetUserData(uid){
    this.authService.getUsuario(uid).subscribe(r=>{
      if(r.length > 0)
        this.RegistrarUsuario()
    })
  }
  
  RegistrarUsuario(){

  }
}
