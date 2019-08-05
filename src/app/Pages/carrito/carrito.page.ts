import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductosService } from '../../Services/Productos/productos.service'
import { Storage } from '@ionic/storage';
import { ConfiguracionComponent } from '../../Configuracion/configuracion/configuracion.component'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  Productos: [];
  loading= true;
  rutaImagenProducto = "";

  constructor(
   private modalCtrl: ModalController,
   private productosService: ProductosService,
   private store: Storage,
   private configuracion: ConfiguracionComponent
  ) { }

  ngOnInit() {
    this.rutaImagenProducto = this.configuracion.rutaImagenesProductos
    this.getProductos()
  }

  close(){
    this.modalCtrl.dismiss()
  }

  getProductos(){
    this.store.get('carrito').then(carrito=>{
      if(carrito!= null && carrito.Productos != null){
        this.Productos = carrito.Productos
      } 
    }).finally(()=>{
      this.loading= false
    })
  }
}
