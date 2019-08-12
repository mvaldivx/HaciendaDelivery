import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  constructor(private nativeGeocoder: NativeGeocoder) { 
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
      console.log(e)
      this.markerGroup = leaflet.featureGroup();
      this.marker = leaflet.marker([e.latitude, e.longitude],{draggable:true}).on('click', () => {
        alert('Marker clicked');
      })
      this.markerGroup.addLayer(this.marker);
      this.map.addLayer(this.markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
      }).on('click',this.onMapClick,this)
      
  }

  onMapClick(e){
    console.log(e)
    this.getReverseGeocode(e.latlng.lat,  e.latlng.lng)
    this.markerGroup.removeLayer(this.marker)
    this.marker = leaflet.marker([e.latlng.lat,  e.latlng.lng],{draggable:true}).on('click', () => {
      alert('Marker clicked');
    })
    this.markerGroup.addLayer(this.marker);
    this.map.addLayer(this.markerGroup);
  }

  getReverseGeocode(lat, lng){
    this.nativeGeocoder.reverseGeocode(lat,lng,this.options).then((result:NativeGeocoderResult[])=>{
      console.log(JSON.stringify(result[0]))
    })
  }

}
