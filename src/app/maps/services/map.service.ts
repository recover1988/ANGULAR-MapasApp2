import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;

  // booleano para saber si el mapa esta listo
  get isMapReady() {
    return !!this.map
  }

  // guardamos la referencia del mapa
  setMap(map: Map) {
    this.map = map;
  }

  // Para volvel al punto anterior
  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) {
      throw Error('El mapa no esta inicializado')
    }
    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }
}
