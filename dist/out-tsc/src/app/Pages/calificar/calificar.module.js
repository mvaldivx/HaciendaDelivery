import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CalificarPage } from './calificar.page';
const routes = [
    {
        path: '',
        component: CalificarPage
    }
];
let CalificarPageModule = class CalificarPageModule {
};
CalificarPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [CalificarPage]
    })
], CalificarPageModule);
export { CalificarPageModule };
//# sourceMappingURL=calificar.module.js.map