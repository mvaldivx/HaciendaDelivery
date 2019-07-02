import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSearchbar } from '@ionic/angular';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
import { PrincipalComponent } from '../../../Api/Principal/principal/principal.component';
import { HttpParams } from '@angular/common/http'


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
Categorias:any=[];
searchbar = false;
searchbarVal:any='';
autocomplete:any=[];

@ViewChild('searchb') myInput: IonSearchbar;

  constructor(
    private menu: MenuController,
    private configuracion: ConfiguracionComponent,
    private ApiPrincipal: PrincipalComponent
  ) { }

  ngOnInit() {
    /*this.ApiPrincipal.getCategorias().subscribe(data=>{
      this.Categorias = data
    });*/
  }

  openFirst() {
    this.menu.toggle('first')
  }

  rutaImagen(){
    return this.configuracion.getRutaImagenes()
  }

  setsearch(){
    this.autocomplete = []
    this.searchbarVal = ''
    this.searchbar = !this.searchbar
    if(this.searchbar)
      setTimeout(() => { this.myInput.setFocus(); }, 150);
  }

  getOptions(){
    if(this.searchbarVal.length > 0){
      let par = new HttpParams().set('Palabra',this.searchbarVal)
      this.ApiPrincipal.getPrediccion(par).subscribe(data=>{
        if(data.length > 0){
          this.autocomplete = data
        }else
        this.autocomplete = []
      });
    }else{
      this.autocomplete = []
    }
  }

}
