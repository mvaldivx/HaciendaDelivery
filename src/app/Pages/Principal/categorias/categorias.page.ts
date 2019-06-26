import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
import { PrincipalComponent } from '../../../Api/Principal/principal/principal.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
Categorias:any=[];


  constructor(
    private menu: MenuController,
    private configuracion: ConfiguracionComponent,
    private ApiPrincipal: PrincipalComponent
  ) { }

  ngOnInit() {
    this.ApiPrincipal.getCategorias().subscribe(data=>{
      this.Categorias = data
    });
  }

  openFirst() {
    this.menu.toggle('first')
  }

  rutaImagen(){
    return this.configuracion.getRutaImagenes()
  }
}
