import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionComponent } from 'src/app/Configuracion/configuracion/configuracion.component';
import { NavParams, IonSlides, ModalController } from '@ionic/angular'; 
import { CalificacionesService } from '../../Api/Services/Calificaciones/calificaciones.service'

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.page.html',
  styleUrls: ['./calificar.page.scss'],
})

export class CalificarPage implements OnInit {
  @ViewChild('slides', null) slides:IonSlides;
  rutaImagenesLogos = "";
  detallePedido: any[];
  pedido:any;
  calificaciones=[];
  negocios=[];
  constructor(
    private configuracion: ConfiguracionComponent,
    private NavParams: NavParams,
    private calService: CalificacionesService,
    private modalCrtl: ModalController
  ) { }

  ngOnInit() {
    this.rutaImagenesLogos = this.configuracion.rutaImagenesLogos
    this.detallePedido = this.NavParams.get('detallePedido');
    this.pedido = this.NavParams.get('pedido');
    if(this.detallePedido){
      var neg = []
      this.detallePedido.forEach((dp, i)=>{
        if(!neg.includes(dp.IdNegocio)){
          neg.push(dp.IdNegocio)
          this.negocios.push({IdNegocio: dp.IdNegocio})
          this.calificaciones.push({
            index:i, 
            calificacion:[{val:1,cal:0},{val:2,cal:0},{val:3,cal:0},{val:4,cal:0},{val:5,cal:0}],
            comentario:''
          })
        }
        
      })
    }
  }



  close(){
    this.modalCrtl.dismiss()
  }
  

  califica(cal, ind){
    for(let i = 0; i < this.calificaciones[ind].calificacion.length ; i ++){
      this.calificaciones[ind].calificacion[i].cal = (i +1 <= cal.val)?1:0;
    }
    
  }

  continuar(){
    this.slides.isEnd().then(r=>{
      if(!r){
       this.slides.slideNext()
      }
      else{
        this.negocios.forEach((dp,i)=>{
          var calif = 0
          this.calificaciones[i].calificacion.forEach(c=>{
            calif += (c.cal === 1)?1:0;
          })
         dp.calificacion = calif
         var fecha= new Date()
         var aux = {
          IdNegocio : dp.IdNegocio,
          IdUsuario : this.pedido.IdUsuario,
          IdPedido: this.pedido.IdPedido,
          Calificacion: calif,
          Comentario :this.calificaciones[i].comentario,
          Fecha: fecha.getFullYear()  + '/' + (fecha.getMonth() +1) + '/' + fecha.getDate() +'T'+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds()
          }
          this.calService.insertResenia(aux).subscribe((r)=>{
            this.modalCrtl.dismiss({res:'Tu opinion es muy importante, gracias.', exitoso:true})
          },(err)=>{ this.modalCrtl.dismiss({res:err.error, exitoso:false})});
        })
      }
    })
    
    
    
  }

}
