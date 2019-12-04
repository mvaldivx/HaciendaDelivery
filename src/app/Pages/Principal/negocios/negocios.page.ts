import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { PrincipalComponent, Negocio } from '../../../Api/Principal/principal/principal.component';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'
import { CalificacionesService } from '../../../Api/Services/Calificaciones/calificaciones.service'
import { ReseniasPage } from '../resenias/resenias.page'
import { Storage } from '@ionic/storage';

export interface NegocioR {
  IdCategoria: number;
  IdNegocio: number
  Negocio: string;
  Estatus: boolean;
  Descripcion: string;
  Calificacion: object;
  imgError?:boolean;
}
@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.page.html',
  styleUrls: ['./negocios.page.scss'],
})
export class NegociosPage implements OnInit {
IdCategoria:number = 0;
Categoria:string="";
Negocios:Negocio[];
NegociosR:NegocioR[];
rutaImagenLogo:string="";
calTmp=[];
loading = true
imagenesCargadas= 0
rutaNoImage="";

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private principalApi: PrincipalComponent,
    private configuracion: ConfiguracionComponent,
    private calificaciones: CalificacionesService,
    private modalCtrl: ModalController,
    private storage : Storage
  ) { }

  ngOnInit() {
    this.rutaImagenLogo = this.configuracion.rutaImagenesLogos
    this.rutaNoImage = this.configuracion.rutaNoImage
    this.storage.get('categoria').then(cat=>{
      this.Categoria = cat
    })
    this.route.queryParams.subscribe(params=>{
      this.IdCategoria = params["IdCategoria"]
     // this.Categoria = params["Categoria"]
    })
    if(this.IdCategoria != null){
      this.principalApi.getNegocios({idCategoria:this.IdCategoria}).subscribe(res=>{
        this.Negocios = res
        this.NegociosR = []
        this.Negocios.forEach(n=>{
          this.getCalificacion(n.IdNegocio).finally(()=>{
            this.NegociosR.push({
              IdCategoria: n.IdCategoria,
              IdNegocio: n.IdNegocio,
              Negocio: n.Negocio,
              Estatus: n.Estatus,
              Descripcion: n.Descripcion,
              Calificacion: this.calTmp
            })
          })
          
        })
        if(this.Negocios.length== 0){
          this.loading= false
        }
      })
    }else{
      this.navCtrl.navigateRoot('categorias')
    }
  }

   getCalificacion(idNegocio){
    return new Promise<Object>(resolve =>{
      let response=[]
    this.calificaciones.getResenias(idNegocio).subscribe(res=>{
      let cont = 0
      let sum = 0
      res.forEach(e=>{
        cont+=1
        sum+= e.Calificacion
      })
      let prom = sum / cont
      if(!isNaN(prom))
        response = [{n:1,t:(prom == 0)?3:(prom < 1)?2:1},
         {n:2,t:(prom <= 1)?3:(prom < 2)?2:1},
         {n:3,t:(prom <= 2)?3:(prom < 3)?2:1},
         {n:4,t:(prom <= 3)?3:(prom < 4)?2:1},
         {n:5,t:(prom <= 4)?3:(prom < 5)?2:1}]
      this.calTmp = response
      resolve(response)
    })
    })
 
  }


  ShowProductos(id,Negocio){
    let navExtras: NavigationExtras={
      queryParams:{
        IdNegocio:id,
        Negocio:Negocio
      }
    }
    
    this.navCtrl.navigateForward(['productos'], navExtras)
  }

  async getResenias(IdNegocio){
    const modal = await this.modalCtrl.create({
      component:ReseniasPage,
      componentProps:{
        'IdNegocio':IdNegocio
      }
    })
    await modal.present();
  }

  imagenCargada(IdNegocio){
    this.imagenesCargadas +=1
    if(this.imagenesCargadas == this.NegociosR.length){
      this.loading = false
    }
  }

  errorImage(idNegocio){
    this.imagenesCargadas +=1
    if(this.imagenesCargadas == this.NegociosR.length){
      this.loading = false
    }
    this.NegociosR.forEach(n=>{
      if(n.IdNegocio == idNegocio)
        n.imgError = true
    })
  }

}
