import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { DirectionsApiClient } from '../api/directionsApiClient';
import { DirectionsResponse, Route } from '../interfaces/directions';
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
  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
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
    // si no hay marcadores
    if (places.length === 0) return;

    // Limites del mapa

    const bounds = new LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation)

    this.map.fitBounds(bounds, { padding: 150 });
  }

  // Obtener la distancia y la duracion del recorrido
  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => this.drawPolyline(resp.routes[0]))
  }

  private drawPolyline(route: Route) {
    console.log({ kms: route.distance / 1000, duration: route.duration / 60 })

    if (!this.map) throw Error('Mapa no inicializado');

    // Dibujamos los puntos en el mapa
    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach(([lng, lan]) => {
      bounds.extend([lng, lan])
    })


    this.map?.fitBounds(bounds, {
      padding: 150
    })

    // Polyline(googlemap) o LineString(mapbox)
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    // Agregamos el id 'RouteString' con el cual identificamos la linea.
    // Si queremos dibujar mas lineas tendemos que hacer ids dinamicos y los colores tambien.

    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);
    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    })


  }



  constructor(
    private directionsApi: DirectionsApiClient
  ) { }
}
