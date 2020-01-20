import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnunciosPage } from './anuncios.page';
import { NuevoAnuncioComponent } from './nuevo-anuncio/nuevo-anuncio.component'
import { DetalleNegocioComponent } from './detalle-negocio/detalle-negocio.component'

const routes: Routes = [
  {
    path: '',
    component: AnunciosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnunciosPage,NuevoAnuncioComponent, DetalleNegocioComponent]
})
export class AnunciosPageModule {}
