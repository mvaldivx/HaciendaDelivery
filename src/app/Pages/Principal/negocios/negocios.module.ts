import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NegociosPage } from './negocios.page';

import { LoadingComponent } from '../../../Components/loading/loading.component'

const routes: Routes = [
  {
    path: '',
    component: NegociosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[LoadingComponent],
  declarations: [NegociosPage,LoadingComponent]
})
export class NegociosPageModule {}
