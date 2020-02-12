import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PedidosPage } from './pedidos.page';
const routes = [
    {
        path: '',
        component: PedidosPage
    }
];
let PedidosPageModule = class PedidosPageModule {
};
PedidosPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [PedidosPage]
    })
], PedidosPageModule);
export { PedidosPageModule };
//# sourceMappingURL=pedidos.module.js.map