import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-configuracion'
})
export class ConfiguracionComponent implements OnInit {

  films: Observable<any>;
  ip : string = '172.16.214.54'
  rutaImagenes: string = 'http://mauvalsa.com/HaciendaDelivery/resources/Images/Categorias/';
  rutaImagenesNegocios: string = 'http://mauvalsa.com/HaciendaDelivery/resources/Images/Negocios/';
  rutaImagenesLogos: string = 'http://mauvalsa.com/HaciendaDelivery/resources/Images/Logos/';
  rutaImagenesProductos: string='http://mauvalsa.com/HaciendaDelivery/resources/Images/Productos/'

  puerto: string = '5357';
  servidor: string = 'http://'+this.ip;

  constructor(
    public httpClient: HttpClient
  ) { 
  }

  getRutaImagenes(){
    return this.rutaImagenes
  }

  getRutaImagenesNegocios(){
    return this.rutaImagenesNegocios
  }



  claim(padre,archivo,params): Observable<any> {
    return this.httpClient.get(this.servidor +':'+ this.puerto +'/WSSAD/Api/'+ padre + '/' + archivo ,{params:params})
  }

  ngOnInit() {}

}
