import { Component, OnInit } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'
import { Observable } from 'rxjs';


export interface Categoria {
  Id: number;
  Categoria: string;
  img: string;
}
export interface Negocio {
  IdCategoria: number;
  IdNegocio: number
  Negocio: string;
  Estatus: boolean;
  Descripcion: string;
}

export interface Producto {
  IdProducto: number;
  IdNegocio: number
  Descripcion: string;
  Producto: string;
  Precio: number;
}
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
    return this.config.claim('Principal','getCategorias',{})
  }

  getNegocios(params): Observable<any>{
    return this.config.claim('Principal','getNegocios',params)
  }

  getProductos(params): Observable<any>{
    return this.config.claim('Principal','getProductos',params)
  }

  getProducto(params): Observable<any>{
    return this.config.claim('Principal','getProducto',params)
  }

  getPrediccion(params): Observable<any>{
    return this.config.claim('Principal','GetPrediccion',params)
  }
}
