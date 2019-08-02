import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSearchbar, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
import { PrincipalComponent } from '../../../Api/Principal/principal/principal.component';
import { HttpParams } from '@angular/common/http'
import { Categoria, CategoriasService } from '../../../Services/Categorias/categorias.service'


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
Categorias:Categoria[];
searchbar = false;
searchbarVal:any='';
autocomplete:any=[];

@ViewChild('searchb') myInput: IonSearchbar;

  constructor(
    private menu: MenuController,
    private configuracion: ConfiguracionComponent,
    private ApiPrincipal: PrincipalComponent,
    private categoriasService: CategoriasService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
   /* this.ApiPrincipal.getCategorias().subscribe(data=>{
      this.Categorias = data
    });*/
    this.categoriasService.getCategorias().subscribe(res=>{
      this.Categorias = res;
    })
  }

  ShowNegocios(id,categoria){
    let navExtras: NavigationExtras={
      queryParams:{
        IdCategoria:id,
        Categoria:categoria
      }
    }
    
    this.navCtrl.navigateForward(['negocios'], navExtras)
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
