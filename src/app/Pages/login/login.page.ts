import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Events } from '@ionic/angular';
import { AuthenticationService } from '../../Services/Authentication/authentication.service'
import * as firebase from 'firebase/app';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router'
import { customAlertoutAnimation, customAlertinAnimation } from '../../Transitions/InPage'
import { UtilsComponent } from '../../utils/utils.component'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  codigo="+52";
  phoneNumber:Number;

  constructor(
    public navCtrl:NavController, 
    public alertCtrl:AlertController,
    private authService: AuthenticationService,
    private router: Router,
    private utils: UtilsComponent,
    private events: Events,
    private storage: Storage
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
        this.utils.alertGenerico('Error','Verifique el numero ingresado' + phoneNumberString + ' '  + error )
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
      ],
      enterAnimation: customAlertinAnimation,
      leaveAnimation: customAlertoutAnimation
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
      this.utils.alertGenerico('Error','Codigo incorrecto' + ' ' + error)
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  close(){
    this.navCtrl.back()
  }

  GetUserData(uid){
    this.authService.getUsuario(uid).subscribe(r=>{
      if(r.length > 0){
        this.storage.set('Usuario',r[0]).then(()=>{
          this.events.publish('usuario:register')
          this.navCtrl.navigateRoot('')
        })
        
      }else
        this.RegistrarUsuario(uid)
    })
  }
  
  RegistrarUsuario(uid){
    let navExtras: NavigationExtras={
      queryParams:{
        uid:uid,
        phoneNumber: this.phoneNumber
      }
    }
    this.router.navigate(['registro'],navExtras)
    //this.navCtrl.navigateForward(['registro'],navExtras)
  }
}
