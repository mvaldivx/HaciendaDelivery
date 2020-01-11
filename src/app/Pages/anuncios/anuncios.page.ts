import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AnunciosService } from '../../Api/Services/Anuncios/anuncios.service';
import { ConfiguracionComponent } from '../../Configuracion/configuracion/configuracion.component'

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.page.html',
  styleUrls: ['./anuncios.page.scss'],
  animations:[
    trigger('fadein',[
      state('void',style({opacity:0, left:'-1000px'})),
      transition('void => *', [
        style({opacity:1}),
        animate('600ms ease-out', style({left:0}))
      ])
    ])
  ]
})
export class AnunciosPage implements OnInit {
misNegocios =[];
cargando = true;
rutaImagenesNegocios = '';
usuario:{};
changingStatus= false;
  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private AnunciosServ: AnunciosService,
    private configuracion: ConfiguracionComponent
    ) { 
      this.rutaImagenesNegocios = this.configuracion.rutaImagenesLogos
    }

  ngOnInit() {
    this.storage.get('Usuario').then(usr=>{
      if(usr.IdUsuario){
        this.usuario = usr
        this.ObtieneAnuncios(usr.IdUsuario)        
      }else{
        this.navCtrl.navigateRoot([''])
      }
    })
  }

  ObtieneAnuncios(idUsuario){
    this.AnunciosServ.getMisNegocios({IdUsuario:idUsuario}).subscribe(res=>{
      this.misNegocios = res
      this.cargando = false
    })
  }

  close(){
    this.navCtrl.navigateRoot([''])
  }

  changeStatusNegocio(idNegocio, estatus, ev){
    this.changingStatus = true
    if(ev.returnValue)
    this.AnunciosServ.ChangeNegocioEstatus({IdNegocio:idNegocio, Estatus:(estatus)?1:0}).subscribe(()=>{
      this.changingStatus = false
    },(err)=>{
      this.changingStatus = false
    })
  }

  getProductos(){
    if(!this.changingStatus){
      console.log('getProductos')
    }
  }

}
