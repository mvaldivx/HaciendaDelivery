import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CalificacionProductos, CalificacionesService } from '../../../Services/Calificaciones/calificaciones.service';
import { Producto, ProductosService } from '../../../Services/Productos/productos.service';
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
    private productos: ProductosService
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
        this.getProducto(el.IdProducto).then(r=>{
          var aux={IdNegocio:0,Calificacion:[],Comentario:'',IdProducto:0, IdUsuario:0,Producto:'', Fecha:''}
          var dat = new Date(el.Fecha['seconds'] * 1000);
          aux.IdNegocio= el.IdNegocio;
          aux.Calificacion = this.getCalificacion(el.Calificacion);
          aux.Comentario = el.Comentario;
          aux.IdProducto = el.IdProducto;
          aux.IdUsuario = el.IdUsuario;
          aux.Fecha = dat.getDay() + ' ' + this.meses[dat.getUTCMonth() -1] + ' ' + dat.getFullYear() + '  ' + this.getHora(dat.getHours()) + ':' + dat.getMinutes() + ' ' + ((dat.getHours() >= 12)?'PM':'AM');
          aux.Producto = r.toString();
          auxProd.push(aux)  
        })  
           
      })
      this.Resenias = auxProd
      this.loading = false
    })
  }

  async getProducto(IdProducto){
    return new Promise<Object>(resolve =>{
      let paux:Producto[]
      this.productos.getProducto(IdProducto).subscribe(p=>{
          paux = p
          resolve(paux[0].Producto)
      });
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
