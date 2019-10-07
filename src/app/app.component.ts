import { Component } from '@angular/core';
import { Platform, NavController, Events, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Usuario } from './Services/Authentication/authentication.service'
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  Usuario: Usuario
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private events: Events,
    private storage: Storage,
    private mnuctrl: MenuController
  ) {
    this.initializeApp();
    this.events.subscribe('usuario:register',()=>{
      this.loadUserInfo()
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.loadUserInfo();
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
      .startInit("828d30bb-11ce-426c-b6ba-39edcea5fb55", "haciendadelivery-80820")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
    });
  }

  login(){
    this.mnuctrl.toggle()
    this.navCtrl.navigateForward(['login'])
    //this.authService.login()
  }

  logout(){
    this.mnuctrl.toggle()
    this.storage.remove('Usuario').then(()=>{
      this.loadUserInfo()
    })
  }

  loadUserInfo(){
    this.storage.get('Usuario').then(u=>{
      this.Usuario = u
    })
  }

  MisPedidos(){
    this.mnuctrl.toggle()
    this.navCtrl.navigateForward(['pedidos'])
  }

}
