import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'


export interface Negocio{
  IdNegocio: number;
  IdCategoria: number;
  Descripcion: string;
  Estatus: number;
  Negocio: string;
  Abierto: number;
}

@Injectable({
  providedIn: 'root'
})

export class NegociosService {

  constructor(
    private configuracion: ConfiguracionComponent
  ) { }

  getInfoNegocio(IdNegocio):Observable<any>{
    return this.configuracion.claim('Negocios','getInfoNegocio',IdNegocio);
  }

  updateNegocio(data):Observable<any>{
    return this.configuracion.claimPost('Negocios','UpdateNegocio',data);
  }
}
