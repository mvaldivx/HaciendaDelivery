import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DescripcionProductoPage } from './descripcion-producto.page';

const routes: Routes = [
  {
    path: '',
    component: DescripcionProductoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DescripcionProductoPage]
})
export class DescripcionProductoPageModule {}
