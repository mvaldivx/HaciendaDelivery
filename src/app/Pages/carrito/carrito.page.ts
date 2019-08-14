import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductosService } from '../../Services/Productos/productos.service'
import { Storage } from '@ionic/storage';
import { ConfiguracionComponent } from '../../Configuracion/configuracion/configuracion.component'
import { UbicacionPage } from '../ubicacion/ubicacion.page';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss']
})
export class CarritoPage implements OnInit {
  Productos= [];
  loading= true;
  rutaImagenProducto = "";
  Total= 0;

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
        this.Productos.forEach(p=>{
          p.showDel = ''
        })
        this.getTotal()
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
        this.getTotal()
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
              element.showDel = ''
            }else if(element.Cantidad > 1){
              element.Cantidad-=1
            }else if(element.showDel === '' || element.showDel == null){
              console.log(element)
              element.showDel = 'sliding'
            }
        });
        this.Productos = carrito.Productos
        this.getTotal()
        this.store.set('carrito', carrito)
      }
    })
  }

  getTotal(){
    this.Total = 0
    this.Productos.forEach(p=>{
      this.Total+= (p.Producto.Precio * p.Cantidad)
    })
  }


  async IrUbicacion(){
    const modal = await this.modalCtrl.create({
      component:UbicacionPage,
      cssClass: 'my-custom-modal-css'
    })
    await modal.present();
}
}
