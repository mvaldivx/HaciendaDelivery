import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService } from '../../../Services/Productos/productos.service'
import { NavParams, ModalController } from '@ionic/angular'
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-descripcion-producto',
  templateUrl: './descripcion-producto.page.html',
  styleUrls: ['./descripcion-producto.page.scss'],
})
export class DescripcionProductoPage implements OnInit {
  Producto: Producto;
  IdNegocio= 0
  IdProducto= 0;
  cantidad = 1;
  rutaImagenProducto="";
  ComentsAdi = "";

  constructor(
    private productos: ProductosService,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private configuracion: ConfiguracionComponent,
    private storage: Storage
    ) { }

  ngOnInit() {
    this.rutaImagenProducto = this.configuracion.rutaImagenesProductos
    this.IdNegocio = this.navParams.get('IdNegocio');
    this.IdProducto = this.navParams.get('IdProducto');
    this.productos.getProducto(this.IdProducto).subscribe(res=>{
      if(res.length > 0)
        this.Producto = res[0]
        this.ObtienePedido()
    })
  }

  closeDescripcion(tipo){
    this.modalCtrl.dismiss({'status':tipo})
  }

  editCantidad(tipo){
    if(tipo === '+'){
      this.cantidad+=1
    }else{
      if(this.cantidad > 0)
        this.cantidad-=1
    }
  }

  ObtienePedido(){
    this.storage.get('carrito').then((carrito)=>{
      if(carrito != null && carrito.Productos != null){
        carrito.Productos.forEach(prod=>{
          if(prod.Producto.IdProducto == this.IdProducto){
            this.cantidad = prod.Cantidad
            this.ComentsAdi = prod.ComentsAdi
          }
        })
      }
    })
  }

  agregarProducto(){
    let date = new Date()
    const _MS_PER_DAY = 1000 * 60 * 60 ;
    this.storage.get('carrito').then((carrito)=>{
      let agregado = false

      if(carrito != null && carrito.Productos != null && carrito.Fecha != null){
        let fa = new Date(carrito.Fecha)
        let diff = (date.getTime()-fa.getTime())/_MS_PER_DAY
        if(diff < 2){
          let exist = false
        carrito.Productos.forEach(prod=>{
          if(prod.Producto.IdProducto == this.IdProducto){
            prod.Cantidad = this.cantidad
            prod.ComentsAdi = this.ComentsAdi
            exist = true
          }
        })
        if(!exist){
          carrito.Productos.push({Cantidad: this.cantidad, Producto: this.Producto, ComentsAdi:this.ComentsAdi})
        }
        carrito.Fecha = date.getTime()
        this.storage.set('carrito',carrito);
        agregado = true
        }
        
      }
      if(!agregado){
        let carriton =
         {Productos:
          [
            {Cantidad: this.cantidad, Producto: this.Producto, ComentsAdi:this.ComentsAdi}
          ],
          Fecha:date.getTime()}
        this.storage.set('carrito',carriton);
      }
    }).finally(()=>{
      this.closeDescripcion(2)
    })
  }

}
