import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DescripcionProductoPage } from './descripcion-producto.page';
const routes = [
    {
        path: '',
        component: DescripcionProductoPage
    }
];
let DescripcionProductoPageModule = class DescripcionProductoPageModule {
};
DescripcionProductoPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [DescripcionProductoPage]
    })
], DescripcionProductoPageModule);
export { DescripcionProductoPageModule };
//# sourceMappingURL=descripcion-producto.module.js.map