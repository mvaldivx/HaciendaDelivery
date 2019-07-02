import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'categorias', pathMatch: 'full' },
    { path: 'categorias', loadChildren: './Pages/Principal/categorias/categorias.module#CategoriasPageModule' },
    { path: 'negocios', loadChildren: './Pages/Principal/negocios/negocios.module#NegociosPageModule' },
    { path: 'menu', loadChildren: './Pages/menu/menu.module#MenuPageModule' },
    { path: 'carrito', loadChildren: './Pages/carrito/carrito.module#CarritoPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map