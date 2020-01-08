import { Injectable } from '@angular/core';
import { ConfiguracionComponent } from 'src/app/Configuracion/configuracion/configuracion.component';
import { Observable } from 'rxjs';

export interface Calificacion {
  IdNegocio: number;
  Calificacion: number;
  Comentario: string;
  IdProducto: number;
  IdUsuario: number;
  Fecha: Date;
}

export interface CalificacionProductos{
  IdNegocio: number;
  Calificacion: number;
  Comentario: string;
  IdProducto: number;
  IdUsuario: number;
  Producto: string;
  Fecha:Date;
}
@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  constructor(
    private configuracion: ConfiguracionComponent
    ) { }

   getResenias(idNegocio): Observable<any>{
    return this.configuracion.claim('Calificaciones','getResenias',{IdNegocio: idNegocio})
  }

  insertResenia(resenia): Observable<any>{
    return this.configuracion.claimPost('Calificaciones','insertaResenia',resenia)
  }
}
