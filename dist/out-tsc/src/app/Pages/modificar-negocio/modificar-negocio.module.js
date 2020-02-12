import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModificarNegocioPage } from './modificar-negocio.page';
const routes = [
    {
        path: '',
        component: ModificarNegocioPage
    }
];
let ModificarNegocioPageModule = class ModificarNegocioPageModule {
};
ModificarNegocioPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [ModificarNegocioPage]
    })
], ModificarNegocioPageModule);
export { ModificarNegocioPageModule };
//# sourceMappingURL=modificar-negocio.module.js.map