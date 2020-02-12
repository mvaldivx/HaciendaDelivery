import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfiguracionComponent } from './Configuracion/configuracion/configuracion.component';
import { PrincipalComponent } from './Api/Principal/principal/principal.component';
import { BingComponent } from './Api/Bing/bing/bing.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreDireccionesService } from './Api/Services/Direcciones/Store/store.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { DescripcionProductoPageModule } from './Pages/Principal/descripcion-producto/descripcion-producto.module';
import { CarritoPageModule } from './Pages/carrito/carrito.module';
import { ReseniasPageModule } from './Pages/Principal/resenias/resenias.module';
import { UbicacionPageModule } from './Pages/ubicacion/ubicacion.module';
import { UtilsComponent } from './utils/utils.component';
import { DireccionesPageModule } from './Pages/direcciones/direcciones.module';
import { CalificarPageModule } from './Pages/calificar/calificar.module';
import { ModificarNegocioPageModule } from './Pages/modificar-negocio/modificar-negocio.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { PedidosPage } from './Pages/pedidos/pedidos.page';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent
        ],
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
            BrowserAnimationsModule,
            CalificarPageModule,
            ModificarNegocioPageModule
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
            PedidosPage,
            StoreDireccionesService,
            Camera,
            File,
            FileTransfer
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map