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
  Productos= [];
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

  remove(IdProducto){
    this.store.get('carrito').then(carrito=>{
      if(carrito!= null && carrito.Productos != null){
        let aux=[]
        carrito.Productos.forEach(element => {
          if(element.Producto.IdProducto != IdProducto)
            aux.push(element)
        });
        this.Productos = aux
        let date = new Date()
        carrito.Productos = aux
        carrito.Fecha = date.getTime()
        this.store.set('carrito', carrito)
      } 
    })
  }

  edit(IdProducto,tipo){
    this.store.get('carrito').then(carrito=>{
      if(carrito!= null && carrito.Productos != null){
        carrito.Productos.forEach(element => {
          if(element.Producto.IdProducto === IdProducto)
            if(tipo === '+'){
              element.Cantidad+=1
            }else if(element.Cantidad > 1){
              element.Cantidad-=1
            }
        });
        this.Productos = carrito.Productos
        this.store.set('carrito', carrito)
      }
    })
  }
}
