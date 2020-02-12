import { Component, OnInit, Input } from '@angular/core';
import { AnunciosService } from '../../../Api/Services/Anuncios/anuncios.service'
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.scss'],
})
export class DetalleNegocioComponent implements OnInit {
  @Input() IdNegocio:string;
  anuncios=[]
  direccionimagenes= ''
  rutaNoImage= ''
  constructor(
    private AnunciosServ: AnunciosService,
    private configuracion: ConfiguracionComponent,
    private events: Events
  ) { 
    this.rutaNoImage = this.configuracion.rutaNoImage
    this.direccionimagenes = this.configuracion.rutaImagenesProductos
  }

  ngOnInit() {
    this.ObtenerAnuncios()
  }

  ObtenerAnuncios(){
    this.AnunciosServ.getAnunciosNegocio({Negocio:this.IdNegocio}).subscribe(res=>{
      this.anuncios = res
    })
  }

  ModificaAnuncio(IdProducto){
    this.events.publish('modifica:anuncio',{IdProducto:IdProducto, IdNegocio: this.IdNegocio, edit:true})
  }
}
