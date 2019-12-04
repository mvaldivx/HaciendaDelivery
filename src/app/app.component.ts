import { Component } from '@angular/core';
import { Platform, NavController, Events, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Usuario } from './Api/Services/Authentication/authentication.service'
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { PedidosService } from './Api/Services/Pedidos/pedidos.service';
import { PedidosPage } from './Pages/pedidos/pedidos.page'
import { NavigationExtras } from '@angular/router';
import { AuthenticationService } from './Api/Services/Authentication/authentication.service'


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
    private mnuctrl: MenuController,
    private oneSignal: OneSignal,
    private PedidosServ: PedidosService,
    private PedidosModule: PedidosPage,
    private AuthenticationServ: AuthenticationService
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

      /*var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
      .startInit("828d30bb-11ce-426c-b6ba-39edcea5fb55", "haciendadelivery-80820")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();*/
      this.oneSignal.startInit('828d30bb-11ce-426c-b6ba-39edcea5fb55', 'haciendadelivery-80820');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      
      this.oneSignal.handleNotificationReceived().subscribe((received) => {
        // do something when notification is received
        console.log('received',received);
        
       });
       
       this.oneSignal.handleNotificationOpened().subscribe((info) => {
         // do something when a notification is opened
         if(info.notification.payload.additionalData.TipoNotificacion != null){
           if(info.notification.payload.additionalData.TipoNotificacion === 'Seguimiento'){
            this.PedidosServ.getPedido({IdPedido:info.notification.payload.additionalData.IdPedido}).subscribe(dp =>{
              let navExtras: NavigationExtras={
                queryParams:{
                  fromNotificacion:true,
                  DatosPedido: dp[0]
                }
              }
              this.navCtrl.navigateForward(['pedidos'], navExtras)
              //this.PedidosModule.getDetallePedido(dp[0])
            })
           }
         }
       });

       
       this.oneSignal.endInit();

       this.oneSignal.getIds().then((id)=>{
         setTimeout(()=>{
           this.storage.get('Usuario').then(u =>{
             if(u.IdUsuario)
              var Auth = this.AuthenticationServ.getPlayerId({IdUsuario:u.IdUsuario,playerId: id.userId}).subscribe(pi=>{
                  console.log(pi);
                  
                if(!pi.includes({IdUsuario:u.IdUsuario,playerId: id.userId})){
                    Auth.unsubscribe()
                    return this.AuthenticationServ.InsertPlayerId({IdUsuario:u.IdUsuario,playerId: id.userId})
                  }else{
                    return false
                  }
              })
           })
           
         },5000)
       })
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
