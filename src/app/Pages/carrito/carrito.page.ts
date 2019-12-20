import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { DireccionesService } from '../../Api/Services/Direcciones/direcciones.service'
import { Storage } from '@ionic/storage';
import { ConfiguracionComponent } from '../../Configuracion/configuracion/configuracion.component'
import { DescripcionProductoPage } from '../Principal/descripcion-producto/descripcion-producto.page'
import { UtilsComponent } from '../../utils/utils.component'
import { DireccionesPage } from '../direcciones/direcciones.page'
import { PedidosService, Pedido, DetallePedido} from '../../Api/Services/Pedidos/pedidos.service'
import { StoreDireccionesService } from '../../Api/Services/Direcciones/Store/store.service'
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
  realizandoPedido = false

  constructor(
   private modalCtrl: ModalController,
   private store: Storage,
   private configuracion: ConfiguracionComponent,
   private utils: UtilsComponent,
   private direcServices: DireccionesService,
   private popoverDir: PopoverController,
   private pedidoServ: PedidosService,
   private StoreDirecciones: StoreDireccionesService
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

  remove(idPosicion){
    this.store.get('carrito').then(carrito=>{
      if(carrito!= null && carrito.Productos != null){
        let aux=[]
        carrito.Productos.forEach(element => {
          if(element.idPosicion != idPosicion)
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

  edit(IdPosicion,tipo){
    this.store.get('carrito').then(carrito=>{
      if(carrito!= null && carrito.Productos != null){
        carrito.Productos.forEach(element => {
          element.showDel = ''
          if(element.idPosicion === IdPosicion)
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

  }

  async editarPedido(idNegocio,idProducto,ComentsAdi, idPosicion){
    const modal = await this.modalCtrl.create({
      component:DescripcionProductoPage,
      componentProps:{
        'IdNegocio':idNegocio,
        'IdProducto':idProducto,
        'ComentsAdi':ComentsAdi,
        'Aumenta': true,
        'idPosicion': idPosicion
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

  confirmarPedido(){
    this.realizandoPedido = true
    this.store.get('Usuario').then(usr=>{
      if(usr){         
          //Crea Pedido e inserta en BD
          var pedido:Pedido={
            IdPedido: 0,
            IdUsuario: usr.IdUsuario,
            FechaPedido: new Date(),
            Estatus: 'Realizado',
            Calle: this.StoreDirecciones.selectedDir.Calle,
            Numero: this.StoreDirecciones.selectedDir.Numero,
            Total: this.Total,
            lat: this.StoreDirecciones.selectedDir.Latitud,
            lng: this.StoreDirecciones.selectedDir.Longitud,
            FechaConcluido: new Date('1999/01/01')
          }
          this.pedidoServ.CreaPedido({pedido:pedido,detalle:this.Productos}).subscribe(ped=>{
            this.store.remove('carrito')
            this.utils.showToast('Pedido Realizado')
            this.modalCtrl.dismiss()
            //Confirmado el Guardado se guarda detalle de pedido
              /*this.Productos.forEach(p=>{
                var dPedido: DetallePedido={
                  IdPedido: ped.insertId,
                  Cantidad: p.Cantidad,
                  ComentsAdi: (p.ComentsAdi)? p.ComentsAdi:'',
                  IdProducto: p.Producto.IdProducto,
                  IdNegocio: p.Producto.IdNegocio,
                  Precio: p.Producto.Precio
                }
                this.pedidoServ.GuardaDetallePedido(dPedido)
              })
              this.store.remove('carrito')
              this.utils.showToast('Pedido Realizado')
              this.modalCtrl.dismiss()*/
          })
        

      }else{
        this.utils.alertUsuario()
        this.modalCtrl.dismiss()
      }
    })
    //this.pedidoServ.CreaPedido()
    
  }

}
