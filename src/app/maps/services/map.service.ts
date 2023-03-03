import { Injectable } from '@angular/core';
import { LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private markers: Marker[] = [];
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
  // Crear los marcadores de la busqueda
  createMarkersFromPlaces(places: Feature[]) {
    if (!this.map) throw Error('Mapa no inicializado');

    this.markers.forEach(marker => marker.remove());
    const newMarkers = [];
    for (const place of places) {
      // coordenadas
      const [lng, lat] = place.center;
      // Popup mensaje del marcador
      const popup = new Popup()
        .setHTML(`
          <h6>${place.text}</h6>
          <span>${place.place_name}</span>
        `);
      // Marcador en el mapa
      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);
      // Añadir al array de marcadores
      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;
  }
}
