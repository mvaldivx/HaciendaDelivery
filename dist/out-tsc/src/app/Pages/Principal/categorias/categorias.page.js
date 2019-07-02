import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ConfiguracionComponent } from '../../../Configuracion/configuracion/configuracion.component';
import { PrincipalComponent } from '../../../Api/Principal/principal/principal.component';
import { HttpParams } from '@angular/common/http';
import { IonSearchbar } from '@ionic/angular';
var CategoriasPage = /** @class */ (function () {
    function CategoriasPage(menu, configuracion, ApiPrincipal) {
        this.menu = menu;
        this.configuracion = configuracion;
        this.ApiPrincipal = ApiPrincipal;
        this.Categorias = [];
        this.searchbar = false;
        this.searchbarVal = '';
        this.autocomplete = [];
    }
    CategoriasPage.prototype.ngOnInit = function () {
        /*this.ApiPrincipal.getCategorias().subscribe(data=>{
          this.Categorias = data
        });*/
    };
    CategoriasPage.prototype.openFirst = function () {
        this.menu.toggle('first');
    };
    CategoriasPage.prototype.rutaImagen = function () {
        return this.configuracion.getRutaImagenes();
    };
    CategoriasPage.prototype.setsearch = function () {
        this.autocomplete = [];
        this.searchbarVal = '';
        this.searchbar = !this.searchbar;
        /* if(this.searchbar)
           this.ionSearchBar.setFocus()*/
    };
    CategoriasPage.prototype.getOptions = function () {
        var _this = this;
        if (this.searchbarVal.length > 0) {
            var par = new HttpParams().set('Palabra', this.searchbarVal);
            this.ApiPrincipal.getPrediccion(par).subscribe(function (data) {
                if (data.length > 0) {
                    _this.autocomplete = data;
                }
                else
                    _this.autocomplete = [];
            });
        }
        else {
            this.autocomplete = [];
        }
    };
    tslib_1.__decorate([
        ViewChild('sb'),
        tslib_1.__metadata("design:type", IonSearchbar)
    ], CategoriasPage.prototype, "ionSearchBar", void 0);
    CategoriasPage = tslib_1.__decorate([
        Component({
            selector: 'app-categorias',
            templateUrl: './categorias.page.html',
            styleUrls: ['./categorias.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [MenuController,
            ConfiguracionComponent,
            PrincipalComponent])
    ], CategoriasPage);
    return CategoriasPage;
}());
export { CategoriasPage };
//# sourceMappingURL=categorias.page.js.map