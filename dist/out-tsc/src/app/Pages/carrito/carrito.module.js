import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CarritoPage } from './carrito.page';
const routes = [
    {
        path: '',
        component: CarritoPage
    }
];
let CarritoPageModule = class CarritoPageModule {
};
CarritoPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [CarritoPage]
    })
], CarritoPageModule);
export { CarritoPageModule };
//# sourceMappingURL=carrito.module.js.map