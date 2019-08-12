import { Component, OnInit } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-principal'
})
export class PrincipalComponent implements OnInit {



  constructor(
      private config : ConfiguracionComponent
  ) { 
  }

  ngOnInit() {}

  getCategorias(): Observable<any>{
    return this.config.claim('Principal','GetCategorias','')
  }

  getPrediccion(params): Observable<any>{
    return this.config.claim('Principal','GetPrediccion',params)
  }
}
