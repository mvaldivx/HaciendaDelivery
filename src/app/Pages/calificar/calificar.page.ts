import { Component, OnInit } from '@angular/core';
import { ConfiguracionComponent } from 'src/app/Configuracion/configuracion/configuracion.component';
import { NavParams } from '@ionic/angular'; 

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.page.html',
  styleUrls: ['./calificar.page.scss'],
})
export class CalificarPage implements OnInit {
  rutaImagenProducto = "";
  detallePedido: any[];
  constructor(
    private configuracion: ConfiguracionComponent,
    private NavParams: NavParams
  ) { }

  ngOnInit() {
    this.rutaImagenProducto = this.configuracion.rutaImagenesProductos
    this.detallePedido = this.NavParams.get('detallePedido');
    console.log(this.NavParams.get('detallePedido'), this.NavParams.get('pedido'))
  }

}
