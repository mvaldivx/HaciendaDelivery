import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations'
import { NavController } from '@ionic/angular';
import { PedidosService} from '../../Services/Pedidos/pedidos.service'
import { Storage } from '@ionic/storage';
import { UtilsComponent } from 'src/app/utils/utils.component';
import leaflet from 'leaflet';
import { ProductosService } from 'src/app/Services/Productos/productos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  animations:[
    trigger('fadein',[
      state('void',style({opacity:0, left:'-1000px'})),
      transition('void =>*', [
        style({opacity:1}),
        animate('600ms ease-out', style({left:0}))
      ])
    ])
  ]
})
export class PedidosPage implements OnInit {
  @ViewChild('map',{static:true}) mapContainer: ElementRef;
Pedidos: any[]
meses=['Ene','Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
detalle= false;
DetallePedido: any[];
PedidoSelected:any;

  constructor(
    private navCtrl: NavController,
    private PedidosServ: PedidosService,
    private storage: Storage,
    private utils: UtilsComponent,
    private ProductosServ: ProductosService
  ) { }

  ngOnInit() {
    this.ObtienePedidos().then(r=>{
      if(r){
        setTimeout(()=>{
this.GeneraMapas()
        },500)
        
      }
    })
  }

  ObtienePedidos(){
    return new Promise<boolean>(resolve =>{
      this.storage.get('Usuario').then(usr=>{
        if(usr){
          this.PedidosServ.getPedidos(usr.IdUsuario).subscribe(pedidos=>{
            this.Pedidos = pedidos
            this.Pedidos.forEach(p=>{
              
              var dat = new Date(p.FechaPedido['seconds'] * 1000)
              var dc = new Date(p.FechaConcluido['seconds'] * 1000)
              var fp = dat.toLocaleDateString("en-US").split('/')
              var fc = dc.toLocaleDateString("en-US").split('/')
              p.FechaPedido = fp[1] + ' ' + this.meses[parseInt(fp[0])-1] + ' ' + fp[2] + '  ' + this.getHora(dat.getHours()) + ':' + dat.getMinutes() + ' ' + ((dat.getHours() >= 12)?'PM':'AM');
              p.FechaConcluido = fc[1] + ' ' + this.meses[parseInt(fc[0])-1] + ' ' + fc[2] + '  ' + this.getHora(dc.getHours()) + ':' + dc.getMinutes() + ' ' + ((dc.getHours() >= 12)?'PM':'AM');
            })
            resolve(true)
          })
        }else{
          this.utils.alertUsuario()
          resolve(false)
        }
      })
    })

  }

  GeneraMapas(){
    this.Pedidos.forEach(p=>{
      var map:any 
      var mapa = document.getElementById('map' + p.IdPedido)
      map= leaflet.map(mapa,{ zoomControl: false, dragging: false }).fitWorld();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
      map.setView([p.lat, p.lng],16)

      leaflet.DomEvent.stopPropagation
      var marker = leaflet.marker([p.lat,  p.lng],{draggable:false})
      var markerGroup = leaflet.featureGroup();;
      markerGroup.addLayer(marker);
      map.addLayer(markerGroup);
    })
  }

  getHora(hora){
    if(hora <= 12){
      return hora
    }else{
      return hora-12
    }

  }

  close(){
    this.navCtrl.navigateRoot([''])
  }

  getDetallePedido(Pedido){
    if(!this.detalle){
      this.PedidoSelected = Pedido
      this.detalle = true
      this.PedidosServ.getDetallePedido(Pedido.IdPedido).subscribe(dp=>{
        this.DetallePedido=[]
        dp.forEach(d=>{
          var detalle={Cantidad:0,ComentsAdi:"",Precio:0,Producto:""};
          detalle.Cantidad = d.Cantidad;
          detalle.ComentsAdi = d.ComentsAdi;
          detalle.Precio = d.Precio;
          this.ProductosServ.getProducto(d.IdProducto).subscribe(prod=>{
            if(prod.length > 0){
              detalle.Producto = prod[0].Producto
              this.DetallePedido.push(detalle)
            }
          })
        })
        console.log(this.DetallePedido);
        //Crea Mapa Detalle
       var map:any 
        var mapa = document.getElementById('mapaDetalle')
        map= leaflet.map(mapa,{}).fitWorld();
        map.boxZoom.disable();
        map.keyboard.disable();
        leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
        map.setView([this.PedidoSelected.lat, this.PedidoSelected.lng],16)

        leaflet.DomEvent.stopPropagation
        var marker = leaflet.marker([this.PedidoSelected.lat,  this.PedidoSelected.lng],{draggable:false})
        var markerGroup = leaflet.featureGroup();
        markerGroup.addLayer(marker);
        map.addLayer(markerGroup);
      })
    }
  }
}
