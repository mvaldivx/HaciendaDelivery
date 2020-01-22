import { Component, OnInit, Input } from '@angular/core';
import { AnunciosService } from '../../../Api/Services/Anuncios/anuncios.service'
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'

@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.scss'],
})
export class DetalleNegocioComponent implements OnInit {
  @Input() IdNegocio:string;
  anuncios=[]
  direccionimagenes= ''
  constructor(
    private AnunciosServ: AnunciosService,
    private configuracion: ConfiguracionComponent
  ) { 
    this.direccionimagenes = configuracion.rutaImagenesProductos
  }

  ngOnInit() {
    this.ObtenerAnuncios()
  }

  ObtenerAnuncios(){
    this.AnunciosServ.getAnunciosNegocio({Negocio:this.IdNegocio}).subscribe(res=>{
      this.anuncios = res
      console.log(res)
    })
  }

}
