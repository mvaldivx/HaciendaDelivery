import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import leaflet from 'leaflet';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {
  @ViewChild('map',{static:true}) mapContainer: ElementRef;
  map: any;
  marker:any;
  markerGroup:any;
  options: NativeGeocoderOptions={
    useLocale: true,
    maxResults:5
  }
  calle="";
  numero="";

  constructor(
    private nativeGeocoder: NativeGeocoder,
    private modalCtrl: ModalController
    ) { 
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
      maxZoom: 18
    }).addTo(this.map);

    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      this.markerGroup = leaflet.featureGroup();
      this.marker = leaflet.marker([e.latitude, e.longitude],{draggable:true}).on('click',  ()=>{
        this.mapClicked()
      })
      this.marker.on('move',this.dragend, this)
      this.markerGroup.addLayer(this.marker);
      this.map.addLayer(this.markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
      }).on('click',this.onMapClick,this)
      
      
  }

  markerMoved(){
    leaflet.DomEvent.stopPropagation
  }

  onMapClick(e){
    this.getReverseGeocode(e.latlng.lat,  e.latlng.lng)
    this.markerGroup.removeLayer(this.marker)
    this.marker = leaflet.marker([e.latlng.lat,  e.latlng.lng],{draggable:true}).on('click',  ()=>{
      this.mapClicked()
    })
    this.marker.on('move',this.dragend, this)
    //this.marker.on('dragend',this.dragend, this)
    this.markerGroup.addLayer(this.marker);
    this.map.addLayer(this.markerGroup);
  }

  mapClicked(){
    leaflet.DomEvent.stopPropagation
  }

  getReverseGeocode(lat, lng){
    this.nativeGeocoder.reverseGeocode(lat,lng,this.options).then((result:NativeGeocoderResult[])=>{
      this.calle = result[0].thoroughfare
      this.numero = result[0].subThoroughfare
    })
  }

  dragend(e){
    leaflet.DomEvent.stopPropagation
    var chagedPos = e.target.getLatLng();
    this.getReverseGeocode(chagedPos.lat, chagedPos.lng)
  }

  Close(){
    this.modalCtrl.dismiss()
  }

}
