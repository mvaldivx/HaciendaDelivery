import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { DireccionesService } from '../../Services/Direcciones/direcciones.service'
import { Storage } from '@ionic/storage';
import { ConfiguracionComponent } from '../../Configuracion/configuracion/configuracion.component'
import { DescripcionProductoPage } from '../Principal/descripcion-producto/descripcion-producto.page'
import { UtilsComponent } from '../../utils/utils.component'
import { DireccionesPage } from '../direcciones/direcciones.page'
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
  ubicacion= {};

  constructor(
   private modalCtrl: ModalController,
   private store: Storage,
   private configuracion: ConfiguracionComponent,
   private utils: UtilsComponent,
   private direcServices: DireccionesService,
   private popoverDir: PopoverController
  ) { }

  ngOnInit() {
    this.rutaImagenProducto = this.configuracion.rutaImagenesProductos
    this.getProductos()
    this.getDireccion()
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

  remove(IdProducto, ComentsAdi){
    this.store.get('carrito').then(carrito=>{
      if(carrito!= null && carrito.Productos != null){
        let aux=[]
        carrito.Productos.forEach(element => {
          if(!(element.Producto.IdProducto === IdProducto && element.ComentsAdi === ComentsAdi))
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

  edit(IdProducto, ComentsAdi,tipo){
    this.store.get('carrito').then(carrito=>{
      if(carrito!= null && carrito.Productos != null){
        carrito.Productos.forEach(element => {
          element.showDel = ''
          if(element.Producto.IdProducto === IdProducto && element.ComentsAdi == ComentsAdi)
            if(tipo === '+'){
              element.Cantidad+=1
              element.showDel = ''
            }else if(element.Cantidad > 1){
              element.Cantidad-=1
            }else if(element.showDel === '' || element.showDel == null){
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


  async IrUbicacion(ev: any) {
    const popover = await this.popoverDir.create({
      component: DireccionesPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  getDireccion(){
    this.store.get('Usuario').then(usr=>{
      if(usr){
        this.direcServices.getDireccionActual(usr.IdUsuario).subscribe(d=>{
          if(d.length > 0)
            this.ubicacion = d[0]
        })
      }else{
        this.store.get('ubicacion').then(u=>{
          if(u)
            this.ubicacion = u
        })
      }
      
    })
  }

  async editarPedido(idNegocio,idProducto,ComentsAdi){
    const modal = await this.modalCtrl.create({
      component:DescripcionProductoPage,
      componentProps:{
        'IdNegocio':idNegocio,
        'IdProducto':idProducto,
        'ComentsAdi':ComentsAdi,
        'Aumenta': true
      },
      cssClass: 'my-custom-modal-css'
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data.status == 2){
      this.getProductos()
      this.presentToast()
    }   
  }

  presentToast() {
    this.utils.showToast('Pedido Editado Correctamente')
  }
}
