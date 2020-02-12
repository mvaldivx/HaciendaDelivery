import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AnunciosPage } from './anuncios.page';
import { NuevoAnuncioComponent } from './nuevo-anuncio/nuevo-anuncio.component';
import { DetalleNegocioComponent } from './detalle-negocio/detalle-negocio.component';
const routes = [
    {
        path: '',
        component: AnunciosPage
    }
];
let AnunciosPageModule = class AnunciosPageModule {
};
AnunciosPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [AnunciosPage, NuevoAnuncioComponent, DetalleNegocioComponent]
    })
], AnunciosPageModule);
export { AnunciosPageModule };
//# sourceMappingURL=anuncios.module.js.map