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
  rutaNoImage: string = "assets/images/no-image.jpg"
  UrlBingQuery: string = "http://dev.virtualearth.net/REST/v1/Locations"
  bingKey: string="Al6mHrQ7P6DoX0ZmlKVbhx81Ra2L4_tWDu2Gydy1NlY3T25ey4rNctMSwA1LOrvK"
  //Ejemplo Estructura bing Query
  //http://dev.virtualearth.net/REST/v1/Locations?q=calle%2013,%20Guadalajara&key=Al6mHrQ7P6DoX0ZmlKVbhx81Ra2L4_tWDu2Gydy1NlY3T25ey4rNctMSwA1LOrvK

  puerto: string = '3000';
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
    return this.httpClient.get(this.servidor +':'+ this.puerto +'/'+ padre + '/' + archivo ,{params:params})
  }

  claimPost(padre,archivo,params): Observable<any>{
    return this.httpClient.post(this.servidor + ':' + this.puerto + '/' + padre + '/' + archivo,{params:params})
  }

  bingClaim(q):Observable<Result>{
    return this.httpClient.get<Result>(q)
  }

  ngOnInit() {}

}
