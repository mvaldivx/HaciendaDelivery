import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReseniasPage } from './resenias.page';
const routes = [
    {
        path: '',
        component: ReseniasPage
    }
];
let ReseniasPageModule = class ReseniasPageModule {
};
ReseniasPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [ReseniasPage]
    })
], ReseniasPageModule);
export { ReseniasPageModule };
//# sourceMappingURL=resenias.module.js.map