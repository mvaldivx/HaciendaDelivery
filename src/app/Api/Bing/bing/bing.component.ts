import { Component, OnInit } from '@angular/core';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component'
import { HttpParams  } from '@angular/common/http';

@Component({
  selector: 'app-bing'
})
export class BingComponent implements OnInit {

  constructor(
    private config : ConfiguracionComponent
  ) { }

  ngOnInit() {}

  getPlaces(query){
    var q = query.replace(/ /g,'%20')
    var peticion = this.config.UrlBingQuery + '?q=' + q + ',MEX' + '&key=' + this.config.bingKey

    return this.config.bingClaim(peticion)
  }

}
