import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, AlertController, Events } from '@ionic/angular';
import { AuthenticationService } from '../../Api/Services/Authentication/authentication.service'
import * as firebase from 'firebase/app';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router'
import { customAlertoutAnimation, customAlertinAnimation } from '../../Transitions/InPage'
import { UtilsComponent } from '../../utils/utils.component'
import { Storage } from '@ionic/storage';
import { StoreDireccionesService } from '../../Api/Services/Direcciones/Store/store.service'
import { DireccionesService } from '../../Api/Services/Direcciones/direcciones.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  codigo="+52";
  phoneNumber:Number;
  btnSignInAvailable=true;

  constructor(
    public navCtrl:NavController, 
    public alertCtrl:AlertController,
    private authService: AuthenticationService,
    private router: Router,
    private utils: UtilsComponent,
    private events: Events,
    private storage: Storage,
    private location: Location,
    private StoreDirecciones: StoreDireccionesService,
    private direccionesService: DireccionesService
    ) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

 signIn(phoneNumber: number){
   if(!isNaN(phoneNumber) && this.codigo != ""){
    this.btnSignInAvailable = false
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = this.codigo + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.presentAlert(confirmationResult)
      })
      .catch( error => {
        this.btnSignInAvailable = true;
        this.utils.alertGenerico('Error','Verifique el numero ingresado' + phoneNumberString + ' '  + error )
      });
   }else{
    this.btnSignInAvailable = true;
   }
  }


  async presentAlert(confirmationResult){
    let aler =  await this.alertCtrl.create({
      header: 'Ingrese el codigo de confirmacion',
      inputs: [{ name: 'confirmationCode', placeholder: 'Codigo' }],
      backdropDismiss : false,
      buttons: [
        { text: 'Cancelar',
          handler: data => { this.btnSignInAvailable = true}
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
      setTimeout(()=>{
        this.btnSignInAvailable = true;
      },3000);
      
      // ...
    }).catch( error => {
      this.btnSignInAvailable = true;
      this.utils.alertGenerico('Error','Codigo incorrecto' + ' ' + error)
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  close(){
    this.location.back();
  }

  GetUserData(uid){
    this.authService.getUsuario({UID:uid}).subscribe(r=>{
      this.RegistrarUsuario(uid)
      if(r.length > 0){
        this.storage.set('Usuario',r[0]).then(()=>{
          this.guardaDireccionSiExiste(r[0]['IdUsuario'])
          this.events.publish('usuario:register')
          this.navCtrl.navigateRoot('')
        })
        
      }else
        this.RegistrarUsuario(uid)
    })
  }

  guardaDireccionSiExiste(idusuario){
    if(this.StoreDirecciones.selectedDir.Calle != ''){
      this.direccionesService.getDirecciones(idusuario).subscribe(res=>{
        var idExist = 0
        var idDirSel = 0
        res.forEach(dir =>{
          if(dir.Calle === this.StoreDirecciones.selectedDir.Calle && dir.Numero === this.StoreDirecciones.selectedDir.Numero){
            idExist = dir.IdDireccion
          }
          if(dir.selected === 1){
            idDirSel = dir.IdDireccion
          }
        })
        if(idDirSel != 0)
            this.direccionesService.CabiarEstatusDefault(idusuario,idDirSel,0).subscribe()
        if(idExist != 0){
          var aux ={
            Calle: this.StoreDirecciones.selectedDir.Calle,
            IdUsuario: idusuario,
            Latitud: this.StoreDirecciones.selectedDir.Latitud,
            Longitud: this.StoreDirecciones.selectedDir.Longitud,
            Numero: this.StoreDirecciones.selectedDir.Numero,
            selected:1
          }
          this.direccionesService.AgregaDireccion(aux).subscribe()
        }else{
          this.direccionesService.CabiarEstatusDefault(idusuario,idExist,1).subscribe()
        }
      })
    }
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
