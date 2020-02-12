import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CryptoJs from 'crypto-js'


@Component({
  selector: 'app-configuracion'
})
export class ConfiguracionComponent implements OnInit {

  films: Observable<any>;
  ip : string = '172.16.214.70'//'3.15.223.31'
  rutaImagenes: string = 'http://mauvalsa.com/HaciendaDelivery/resources/Images/Categorias/';
  rutaImagenesNegocios: string = 'http://mauvalsa.com/HaciendaDelivery/resources/Images/Negocios/';
  rutaImagenesLogos: string = 'http://mauvalsa.com/HaciendaDelivery/resources/Images/Logos/';
  rutaImagenesProductos: string='http://mauvalsa.com/HaciendaDelivery/resources/Images/Productos/'
  rutaNoImage: string = "assets/images/no-image.jpg"
  UrlBingQuery: string = "http://dev.virtualearth.net/REST/v1/Locations"
  bingKey: string="Al6mHrQ7P6DoX0ZmlKVbhx81Ra2L4_tWDu2Gydy1NlY3T25ey4rNctMSwA1LOrvK"
  ipServidorImagenes: string = "http://mauvalsa.com/HaciendaDelivery/"
  //Ejemplo Estructura bing Query
  //http://dev.virtualearth.net/REST/v1/Locations?q=calle%2013,%20Guadalajara&key=Al6mHrQ7P6DoX0ZmlKVbhx81Ra2L4_tWDu2Gydy1NlY3T25ey4rNctMSwA1LOrvK

  puerto: string = '3030';
  servidor: string = 'http://'+this.ip;
  private SECERET_KEY: string = '_*Mauvalsa@95?36839421';

  constructor(
    public httpClient: HttpClient,
  ) { 
  }

  getRutaImagenes(){
    return this.rutaImagenes
  }

  getRutaImagenesNegocios(){
    return this.rutaImagenesNegocios
  }

  claim(padre,archivo,params): Observable<any> {
    return this.httpClient.get(this.servidor +':'+ this.puerto +'/'+ padre + '/' + archivo ,{params:params, headers:this.headersAuth()})
  }

  claimPost(padre,archivo,params): Observable<any>{
    return this.httpClient.post(this.servidor + ':' + this.puerto + '/' + padre + '/' + archivo,{params:params, headers:this.headersAuth()})
  }

  bingClaim(q):Observable<Result>{
    return this.httpClient.get<Result>(q)
  }

  claimImage(params,metodo):Observable<any>{
    return this.httpClient.post(this.ipServidorImagenes + metodo,{params:params})
  }

  headersAuth(){
    let headers = new HttpHeaders({Authorization:this.generateApiKey()});
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return headers
  }

  generateApiKey(){
    var val = new Date().valueOf()
    var key = CryptoJs.HmacSHA256(val.toString(),this.SECERET_KEY).toString()
    return val + '%$&'+ key.toString()
  }

  ngOnInit() {}

}
