import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategoriasPage } from './categorias.page';
const routes = [
    {
        path: '',
        component: CategoriasPage
    }
];
let CategoriasPageModule = class CategoriasPageModule {
};
CategoriasPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [CategoriasPage]
    })
], CategoriasPageModule);
export { CategoriasPageModule };
//# sourceMappingURL=categorias.module.js.map