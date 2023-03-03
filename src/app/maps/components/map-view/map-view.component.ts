import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) throw Error('No hay placesServices.userLocation')
    // Mostrar mapa
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
    // Popup
    const popup = new Popup()   // Popup({}) puede tener un objeto con config
      .setHTML(`
        <h6>Aqui estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);
    // Marker
    new Marker({ color: 'red' })
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map)
    // se guarda el mapa en el servicio y asi lo podemos usar de manera global
    this.mapService.setMap(map);
  }




  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) { }
}
