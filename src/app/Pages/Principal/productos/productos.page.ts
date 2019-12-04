import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ToastController  } from '@ionic/angular';
import { PrincipalComponent, Producto } from '../../../Api/Principal/principal/principal.component';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'
import { DescripcionProductoPage } from '../descripcion-producto/descripcion-producto.page'
import { UtilsComponent } from '../../../utils/utils.component';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  Negocio="";
  IdNegocio=0;
  Productos: Producto[];
  rutaImagenProducto="";
  loading=true;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private ApiPrincipal: PrincipalComponent,
    private configuracion: ConfiguracionComponent,
    private modalCtrl: ModalController,
    private utils: UtilsComponent
    ) { }

  ngOnInit() {
    this.rutaImagenProducto = this.configuracion.rutaImagenesProductos
    this.route.queryParams.subscribe(params=>{
      this.IdNegocio = params["IdNegocio"]
      this.Negocio = params["Negocio"]
    })
    if(this.IdNegocio != null){
      this.ApiPrincipal.getProductos({idNegocio: this.IdNegocio}).subscribe(res=>{
        this.Productos = res
        this.loading = false
      })
    }
    else{
      this.navCtrl.navigateRoot('categorias')
    }
  }

  async DescripcionProducto(idNegocio,idProducto){
    const modal = await this.modalCtrl.create({
      component:DescripcionProductoPage,
      componentProps:{
        'IdNegocio':idNegocio,
        'IdProducto':idProducto,
        'Aumenta': false
      },
      cssClass: 'my-custom-modal-css'
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data.status == 2){
      this.presentToast()
    }   
    
  }

   presentToast() {
    this.utils.showToast('Producto agregado correctamente.')
    /*const toast = await this.toastCtrl.create({
      message: 'Producto agregado correctamente.',
      duration: 2000
    });
    toast.present();*/
  }

}
