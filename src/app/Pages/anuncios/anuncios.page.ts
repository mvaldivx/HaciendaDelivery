import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { NavController, Events, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AnunciosService } from '../../Api/Services/Anuncios/anuncios.service';
import { ConfiguracionComponent } from '../../Configuracion/configuracion/configuracion.component'
import { ModificarNegocioPage } from '../modificar-negocio/modificar-negocio.page'
import { myEnterAnimation, myLeaveAnimation } from '../../Transitions/ModalEnterAnimation'
import 'hammerjs'

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
nuevoAnuncio= false;
visibleNuevoAnuncio = false;
detalleNegocio= false;
visibledetalleNegocio = false;
selectedIdNegocio= 0;
rutaNoImage:string = '';
EditAdSelected= {IdProducto: 0, IdNegocio: 0, edit: false}
  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private AnunciosServ: AnunciosService,
    private configuracion: ConfiguracionComponent,
    private events: Events,
    private modalCtrl: ModalController
    ) { 
      this.rutaNoImage = this.configuracion.rutaNoImage
      this.rutaImagenesNegocios = this.configuracion.rutaImagenesLogos
      events.subscribe('anuncios:insertado',()=>{
        this.setNuevoAnuncioState(false)
      })
      events.subscribe('modifica:anuncio',(info)=>{
        this.setdetalleNegocioState(false)
        this.EditAdSelected = info
        setTimeout(()=>{
          this.newAd()
        },500)
      })
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

  getProductos(IdNegocio){
    if(!this.changingStatus){
      this.selectedIdNegocio = IdNegocio
      this.setdetalleNegocioState(true)
    }
  }

  newAd(){
    this.setNuevoAnuncioState(true)
    //this.navCtrl.navigateForward(['nuevo-anuncio'])
  }

  NuevoAnuncioSwipe(e){
    if(e.direction === 4){
      this.setNuevoAnuncioState(false)
    }
  }

  setNuevoAnuncioState(state){
    this.nuevoAnuncio = state
    if(state)
      this.visibleNuevoAnuncio = state
    else
      setTimeout(() => {
        this.visibleNuevoAnuncio = state
      }, 500);
  }

  setdetalleNegocioState(state){
    this.detalleNegocio = state
    if(state)
      this.visibledetalleNegocio = state
    else
      setTimeout(() => {
        this.visibledetalleNegocio = state
      }, 500);
  }


  async ModificaNegocio(idNegocio){
    this.changingStatus = true
    const modal = await this.modalCtrl.create({
      component: ModificarNegocioPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {IdNegocio: idNegocio}
    })
    modal.onDidDismiss().then(res=>{
      this.changingStatus = false
      if(res.data){
      }
      
    })
    
    return await modal.present();
    
  }


}
