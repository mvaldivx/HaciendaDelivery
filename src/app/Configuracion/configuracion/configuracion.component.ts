import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-configuracion'
})
export class ConfiguracionComponent implements OnInit {

  rutaImagenes: string = '//localhost:80/SAD/Images/Categorias/';
  rutaImagenesNegocios: string = '//localhost:80/SAD/Images/Negocios/';

  puerto: string = '80';
  servidor: string = 'http://localhost:80';

  constructor(
    private http: HTTP
  ) { 
  }

  getRutaImagenes(){
    return this.rutaImagenes
  }

  getRutaImagenesNegocios(){
    return this.rutaImagenesNegocios
  }

  claim(padre ,archivo , params){ 
     this.http.get(this.servidor +'/'+ padre + '/' + archivo + '.php',params,{})
    .then(data => {
      return data
    })
    .catch(error =>{
      return error
    })
  }

  ngOnInit() {}

}
