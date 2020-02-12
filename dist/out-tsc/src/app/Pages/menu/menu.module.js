import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
const routes = [
    {
        path: '',
        component: MenuPage
    }
];
let MenuPageModule = class MenuPageModule {
};
MenuPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [MenuPage]
    })
], MenuPageModule);
export { MenuPageModule };
//# sourceMappingURL=menu.module.js.map