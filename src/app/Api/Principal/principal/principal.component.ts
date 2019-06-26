import { Component, OnInit } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'


@Component({
  selector: 'app-principal'
})
export class PrincipalComponent implements OnInit {



  constructor(
      private config : ConfiguracionComponent
  ) { 
  }

  ngOnInit() {}

  getCategorias(){
    return this.config.claim('Principal','GetCategorias','')
  }
}
