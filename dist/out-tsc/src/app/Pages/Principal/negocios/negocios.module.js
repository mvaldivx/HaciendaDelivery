import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NegociosPage } from './negocios.page';
import { LoadingComponent } from '../../../Components/loading/loading.component';
const routes = [
    {
        path: '',
        component: NegociosPage
    }
];
let NegociosPageModule = class NegociosPageModule {
};
NegociosPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        entryComponents: [LoadingComponent],
        declarations: [NegociosPage, LoadingComponent]
    })
], NegociosPageModule);
export { NegociosPageModule };
//# sourceMappingURL=negocios.module.js.map