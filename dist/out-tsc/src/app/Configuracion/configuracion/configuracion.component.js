import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CryptoJs from 'crypto-js';
let ConfiguracionComponent = class ConfiguracionComponent {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.ip = '172.16.214.70'; //'3.15.223.31'
        this.rutaImagenes = 'http://mauvalsa.com/HaciendaDelivery/resources/Images/Categorias/';
        this.rutaImagenesNegocios = 'http://mauvalsa.com/HaciendaDelivery/resources/Images/Negocios/';
        this.rutaImagenesLogos = 'http://mauvalsa.com/HaciendaDelivery/resources/Images/Logos/';
        this.rutaImagenesProductos = 'http://mauvalsa.com/HaciendaDelivery/resources/Images/Productos/';
        this.rutaNoImage = "assets/images/no-image.jpg";
        this.UrlBingQuery = "http://dev.virtualearth.net/REST/v1/Locations";
        this.bingKey = "Al6mHrQ7P6DoX0ZmlKVbhx81Ra2L4_tWDu2Gydy1NlY3T25ey4rNctMSwA1LOrvK";
        this.ipServidorImagenes = "http://mauvalsa.com/HaciendaDelivery/";
        //Ejemplo Estructura bing Query
        //http://dev.virtualearth.net/REST/v1/Locations?q=calle%2013,%20Guadalajara&key=Al6mHrQ7P6DoX0ZmlKVbhx81Ra2L4_tWDu2Gydy1NlY3T25ey4rNctMSwA1LOrvK
        this.puerto = '3030';
        this.servidor = 'http://' + this.ip;
        this.SECERET_KEY = '_*Mauvalsa@95?36839421';
    }
    getRutaImagenes() {
        return this.rutaImagenes;
    }
    getRutaImagenesNegocios() {
        return this.rutaImagenesNegocios;
    }
    claim(padre, archivo, params) {
        return this.httpClient.get(this.servidor + ':' + this.puerto + '/' + padre + '/' + archivo, { params: params, headers: this.headersAuth() });
    }
    claimPost(padre, archivo, params) {
        return this.httpClient.post(this.servidor + ':' + this.puerto + '/' + padre + '/' + archivo, { params: params, headers: this.headersAuth() });
    }
    bingClaim(q) {
        return this.httpClient.get(q);
    }
    claimImage(params, metodo) {
        return this.httpClient.post(this.ipServidorImagenes + metodo, { params: params });
    }
    headersAuth() {
        let headers = new HttpHeaders({ Authorization: this.generateApiKey() });
        headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        return headers;
    }
    generateApiKey() {
        var val = new Date().valueOf();
        var key = CryptoJs.HmacSHA256(val.toString(), this.SECERET_KEY).toString();
        return val + '%$&' + key.toString();
    }
    ngOnInit() { }
};
ConfiguracionComponent = tslib_1.__decorate([
    Component({
        selector: 'app-configuracion'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], ConfiguracionComponent);
export { ConfiguracionComponent };
//# sourceMappingURL=configuracion.component.js.map