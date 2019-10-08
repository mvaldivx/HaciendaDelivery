import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfiguracionComponent } from './Configuracion/configuracion/configuracion.component'
import { PrincipalComponent } from './Api/Principal/principal/principal.component'
import { BingComponent } from './Api/Bing/bing/bing.component'
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth'

import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { DescripcionProductoPageModule } from './Pages/Principal/descripcion-producto/descripcion-producto.module'
import { CarritoPageModule } from './Pages/carrito/carrito.module';
import { ReseniasPageModule } from './Pages/Principal/resenias/resenias.module';
import { UbicacionPageModule } from './Pages/ubicacion/ubicacion.module'
import { UtilsComponent } from './utils/utils.component'
import { DireccionesPageModule } from './Pages/direcciones/direcciones.module'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OneSignal } from '@ionic-native/onesignal/ngx';

import { PedidosPage } from './Pages/pedidos/pedidos.page'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    DescripcionProductoPageModule,
    CarritoPageModule,
    ReseniasPageModule,
    UbicacionPageModule,
    DireccionesPageModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ConfiguracionComponent,
    PrincipalComponent,
    BingComponent,
    UtilsComponent,
    NativeGeocoder,
    OneSignal,
    PedidosPage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
