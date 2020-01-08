import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CalificacionProductos, CalificacionesService } from '../../../Api/Services/Calificaciones/calificaciones.service';
import { PrincipalComponent, Producto } from '../../../Api/Principal/principal/principal.component';
@Component({
  selector: 'app-resenias',
  templateUrl: './resenias.page.html',
  styleUrls: ['./resenias.page.scss'],
})
export class ReseniasPage implements OnInit {
  IdNegocio=0;
  loading=true;
  Resenias=[];
  meses=['Ene','Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private CalificacionesServ: CalificacionesService,
    private productos: PrincipalComponent
  ) { }

  ngOnInit() {
    this.IdNegocio = this.navParams.get('IdNegocio');
    this.ObtieneResenias()
  }

  close(){
    this.modalCtrl.dismiss()
  }

  ObtieneResenias(){
    this.CalificacionesServ.getResenias(this.IdNegocio).subscribe(res=>{
      var auxProd=[]
      res.sort(function(a, b){return b.Fecha['seconds']-a.Fecha['seconds']})
      res.forEach(el=>{
          var aux={IdNegocio:0,Calificacion:[],Comentario:'',IdUsuario:0, Fecha:'', Nombre:''}
          var dat = new Date(el.Fecha);
          var fecha = dat.toLocaleDateString("en-US").split('/')
          aux.IdNegocio= el.IdNegocio;
          aux.Calificacion = this.getCalificacion(el.Calificacion);
          aux.Comentario = el.Comentario;
          aux.IdUsuario = el.IdUsuario;
          aux.Nombre = el.Nombre;
          aux.Fecha = fecha[1] + ' ' + this.meses[parseInt(fecha[0])-1] + ' ' + fecha[2] + '  ' + this.getHora(dat.getHours()) + ':' + dat.getMinutes() + ' ' + ((dat.getHours() >= 12)?'PM':'AM');
          auxProd.push(aux)  
           
      })
      this.Resenias = auxProd
      this.loading = false
    })
  }


  getCalificacion(calificacion){
    var aux=[]
    var medio= false
    for(let i = 1; i <= 5; i++){
      let t=1
      if(calificacion >= i ){
        t= 1
      }else{
        if(this.isInt(calificacion) || medio){
          t=3
        }else{
          t=2
          medio = true
        }
      }
      aux.push({t : t})
    }
    return aux
  }

  isInt(n){
    return (n % 1 === 0)?true:false;
  }


  getHora(hora){
    if(hora <= 12){
      return hora
    }else{
      return hora-12
    }

  }
}
