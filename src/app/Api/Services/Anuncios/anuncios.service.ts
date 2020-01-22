import { Injectable } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  constructor(
    private configuracion: ConfiguracionComponent
  ) { }


  getMisNegocios(IdUsuario): Observable<any>{
    return this.configuracion.claim('Anuncios','getMisNegocios',IdUsuario);
  }

  ChangeNegocioEstatus(data): Observable<any>{
    return this.configuracion.claimPost('Anuncios','ChangeNegocioEstatus',data);
  }

  getCategorias(): Observable<any>{
    return this.configuracion.claim('Anuncios','getCategorias',{})
  }

  NuevoAnuncio(anuncio):Observable<any>{
    return this.configuracion.claimPost('Anuncios','NuevoAnuncio',anuncio)
  }

  getAnunciosNegocio(Negocio):Observable<any>{
    return this.configuracion.claim('Anuncios','GetAnunciosNegocio',Negocio)
  }
}
