import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import leaflet from 'leaflet';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Storage } from '@ionic/storage';
import { BingComponent } from '../../Api/Bing/bing/bing.component';
let UbicacionPage = class UbicacionPage {
    constructor(nativeGeocoder, modalCtrl, store, bing, navParams, navCtrl) {
        this.nativeGeocoder = nativeGeocoder;
        this.modalCtrl = modalCtrl;
        this.store = store;
        this.bing = bing;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.options = {
            useLocale: true,
            maxResults: 5
        };
        this.calle = "";
        this.numero = "";
        this.lat = "";
        this.lng = "";
        this.buscar = "";
        this.Sugerencias = [];
    }
    ngOnInit() {
    }
    ionViewDidEnter() {
        this.loadmap();
    }
    loadmap() {
        this.map = leaflet.map("map").fitWorld();
        leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attributions: 'www.tphangout.com',
            maxZoom: 25
        }).addTo(this.map);
        this.map.locate({
            setView: true,
            maxZoom: 10
        }).on('locationfound', (e) => {
            this.markerGroup = leaflet.featureGroup();
            this.marker = leaflet.marker([e.latitude, e.longitude], { draggable: true }).on('click', () => {
                this.mapClicked();
            });
            this.getReverseGeocode(e.latitude, e.longitude);
            this.marker.on('move', this.dragend, this);
            this.markerGroup.addLayer(this.marker);
            this.map.addLayer(this.markerGroup);
        }).on('locationerror', (err) => {
            console.log(err);
        }).on('click', this.onMapClick, this);
    }
    markerMoved() {
        leaflet.DomEvent.stopPropagation;
    }
    onMapClick(e) {
        this.getReverseGeocode(e.latlng.lat, e.latlng.lng);
        this.markerGroup.removeLayer(this.marker);
        this.marker = leaflet.marker([e.latlng.lat, e.latlng.lng], { draggable: true }).on('click', () => {
            this.mapClicked();
        });
        this.marker.on('move', this.dragend, this);
        this.markerGroup.addLayer(this.marker);
        this.map.addLayer(this.markerGroup);
    }
    mapClicked() {
        leaflet.DomEvent.stopPropagation;
    }
    getReverseGeocode(lat, lng) {
        this.lat = lat;
        this.lng = lng;
        this.nativeGeocoder.reverseGeocode(lat, lng, this.options).then((result) => {
            this.calle = result[0].thoroughfare;
            this.numero = result[0].subThoroughfare;
        });
    }
    dragend(e) {
        leaflet.DomEvent.stopPropagation;
        var chagedPos = e.target.getLatLng();
        this.getReverseGeocode(chagedPos.lat, chagedPos.lng);
    }
    Close() {
        this.modalCtrl.dismiss();
    }
    GuardarUbicacion() {
        if (this.lat != null && this.lng != null && this.calle != null && this.numero != null && this.lat != "" && this.lng != "" && this.calle != "" && this.numero != "") {
            this.store.set('ubicacion', { Latitud: this.lat, Longitud: this.lng, Calle: this.calle, Numero: this.numero });
            this.modalCtrl.dismiss({ lat: this.lat, lng: this.lng, Calle: this.calle, Numero: this.numero });
        }
    }
    buscarLugares() {
        if (this.buscar != "") {
            this.bing.getPlaces(this.buscar).subscribe(r => {
                if (r.resourceSets.length > 0) {
                    this.Sugerencias = r.resourceSets[0].resources;
                }
            });
        }
    }
    muestraSugerencia(d) {
        var points = d.geocodePoints[0].coordinates;
        this.map.flyTo([points[0], points[1]], 18);
        leaflet.DomEvent.stopPropagation;
        this.markerGroup.removeLayer(this.marker);
        this.marker = leaflet.marker([points[0], points[1]], { draggable: true }).on('click', () => {
            this.mapClicked();
        });
        this.marker.on('move', this.dragend, this);
        this.markerGroup.addLayer(this.marker);
        this.map.addLayer(this.markerGroup);
        this.lat = points[0];
        this.lng = points[1];
        this.calle = d.address.addressLine;
        this.buscar = "";
        this.Sugerencias = [];
    }
};
tslib_1.__decorate([
    ViewChild('map', { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], UbicacionPage.prototype, "mapContainer", void 0);
UbicacionPage = tslib_1.__decorate([
    Component({
        selector: 'app-ubicacion',
        templateUrl: './ubicacion.page.html',
        styleUrls: ['./ubicacion.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [NativeGeocoder,
        ModalController,
        Storage,
        BingComponent,
        NavParams,
        NavController])
], UbicacionPage);
export { UbicacionPage };
//# sourceMappingURL=ubicacion.page.js.map