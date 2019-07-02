import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-configuracion'
})
export class ConfiguracionComponent implements OnInit {

  films: Observable<any>;

  rutaImagenes: string = '//localhost:80/SAD/Images/Categorias/';
  rutaImagenesNegocios: string = '//localhost:80/SAD/Images/Negocios/';

  puerto: string = '80';
  servidor: string = 'http://localhost';

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
    return this.httpClient.get(this.servidor +':'+ this.puerto +'/SAD/'+ padre + '/' + archivo + '.php',{params:params})
  }

  ngOnInit() {}

}
