import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations'
import { NavController } from '@ionic/angular';
import { PedidosService, Pedido} from '../../Services/Pedidos/pedidos.service'
import { Storage } from '@ionic/storage';
import { UtilsComponent } from 'src/app/utils/utils.component';

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
Pedidos: any[]
meses=['Ene','Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  constructor(
    private navCtrl: NavController,
    private PedidosServ: PedidosService,
    private storage: Storage,
    private utils: UtilsComponent
  ) { }

  ngOnInit() {
    this.ObtienePedidos()
  }

  ObtienePedidos(){
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
          console.log(this.Pedidos);
          
        })
      }else{
        this.utils.alertUsuario()
      }
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
}
