import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { Producto, ProductosService } from '../../../Services/Productos/productos.service'
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'
import { DescripcionProductoPage } from '../descripcion-producto/descripcion-producto.page'

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

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private productos: ProductosService,
    private configuracion: ConfiguracionComponent,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.rutaImagenProducto = this.configuracion.rutaImagenesProductos
    this.route.queryParams.subscribe(params=>{
      this.IdNegocio = params["IdNegocio"]
      this.Negocio = params["Negocio"]
    })
    if(this.IdNegocio != null){
      this.productos.getProductos(this.IdNegocio).subscribe(res=>{
        this.Productos = res
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
        'IdProducto':idProducto
      }
    })
    return await modal.present();
  }

}
