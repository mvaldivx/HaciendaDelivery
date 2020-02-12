import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UbicacionPage } from './ubicacion.page';
const routes = [
    {
        path: '',
        component: UbicacionPage
    }
];
let UbicacionPageModule = class UbicacionPageModule {
};
UbicacionPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [UbicacionPage]
    })
], UbicacionPageModule);
export { UbicacionPageModule };
//# sourceMappingURL=ubicacion.module.js.map