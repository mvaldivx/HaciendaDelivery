import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DireccionesPage } from './direcciones.page';
const routes = [
    {
        path: '',
        component: DireccionesPage
    }
];
let DireccionesPageModule = class DireccionesPageModule {
};
DireccionesPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [DireccionesPage]
    })
], DireccionesPageModule);
export { DireccionesPageModule };
//# sourceMappingURL=direcciones.module.js.map