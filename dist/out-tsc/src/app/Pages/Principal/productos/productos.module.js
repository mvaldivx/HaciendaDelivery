import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductosPage } from './productos.page';
const routes = [
    {
        path: '',
        component: ProductosPage
    }
];
let ProductosPageModule = class ProductosPageModule {
};
ProductosPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [ProductosPage]
    })
], ProductosPageModule);
export { ProductosPageModule };
//# sourceMappingURL=productos.module.js.map