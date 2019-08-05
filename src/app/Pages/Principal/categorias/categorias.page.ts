import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSearchbar, NavController, ModalController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
import { PrincipalComponent } from '../../../Api/Principal/principal/principal.component';
import { HttpParams } from '@angular/common/http'
import { Categoria, CategoriasService } from '../../../Services/Categorias/categorias.service'
import { Storage } from '@ionic/storage';
import { CarritoPage } from '../../carrito/carrito.page'

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
numProductos= 0;

@ViewChild('searchb') myInput: IonSearchbar;

  constructor(
    private menu: MenuController,
    private configuracion: ConfiguracionComponent,
    private ApiPrincipal: PrincipalComponent,
    private categoriasService: CategoriasService,
    private navCtrl: NavController,
    private storage: Storage,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
   /* this.ApiPrincipal.getCategorias().subscribe(data=>{
      this.Categorias = data
    });*/
    this.categoriasService.getCategorias().subscribe(res=>{
      this.Categorias = res;
    })
    this.getNumProductos()
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

  getNumProductos(){
    let date = new Date()
    const _MS_PER_DAY = 1000 * 60 * 60 ;
    this.storage.get('carrito').then((carrito)=>{
      if(carrito != null && carrito.Productos != null ){
        let fa = new Date(carrito.Fecha)
        let diff = (date.getTime()-fa.getTime())/_MS_PER_DAY
        if(diff >= 2){
          this.storage.remove('carrito')
        }else{
          this.numProductos = carrito.Productos.length
        }
      }
    })
  }

  async irCarrito(){
      const modal = await this.modalCtrl.create({
        component:CarritoPage
      })
      await modal.present();
  }

}
