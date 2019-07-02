import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NegociosPage } from './negocios.page';
var routes = [
    {
        path: '',
        component: NegociosPage
    }
];
var NegociosPageModule = /** @class */ (function () {
    function NegociosPageModule() {
    }
    NegociosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [NegociosPage]
        })
    ], NegociosPageModule);
    return NegociosPageModule;
}());
export { NegociosPageModule };
//# sourceMappingURL=negocios.module.js.map