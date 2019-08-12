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
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { DescripcionProductoPageModule } from './Pages/Principal/descripcion-producto/descripcion-producto.module'
import { CarritoPageModule } from './Pages/carrito/carrito.module';
import { ReseniasPageModule } from './Pages/Principal/resenias/resenias.module';
import { UbicacionPageModule } from './Pages/ubicacion/ubicacion.module'

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
    DescripcionProductoPageModule,
    CarritoPageModule,
    ReseniasPageModule,
    UbicacionPageModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ConfiguracionComponent,
    PrincipalComponent,
    NativeGeocoder,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
