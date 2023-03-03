# MapasApp2

## Geolocalizacion

En el `main.ts` podemos poner una condicion para que el navegador verifique si la geolocalizacion este activada.

```
// main.ts
if (!navigator.geolocation) {
  throw new Error('Navegador no soporta geolocalizacion')
}
```

Para obtener la geolocalizacion del usuario en un formato [longitud, latitud] que es el que usa MapBox(para GoogleMap es al reves). Creamos un servicio en el cual haremos una funcion que devuelva una promesa con los valores de la Geolocaclizacion pero para ser usada con los operadores de rxjs debemos devolverla como promesa.

```
// services/places.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        // los argumentso de el callback son args = { coords, timestap}
        ({ coords, timestamp }) => {
          this.userLocation = [coords.longitude, coords.latitude]
          resolve(this.userLocation)
        },
        (error) => {
          alert('No se puedo obtener la Geolocalizacion')
          console.log(error)
          reject()
        }
      )
    })
  }

  constructor() {
    this.getUserLocation();
  }
}

```

En el constructor llamamos a la funcion `getUserLocation()` para que inmediatamente se obtenga el valor cuando se use.

### Condicion para mostrar el cargando

```
<app-loading *ngIf="!isUserLocationReady; else mapReady"></app-loading>

<ng-template #mapReady>
  <app-map-view></app-map-view>
</ng-template>

```

La funcion `isUserLocationReady` es un boolean.

## Uso de Mapbox

Instalar el npm de Mapbox y los estilos:

```
npm install mapbox-gl --save
<link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
```

En el `main.ts` hacemos la conexion con el token que nos da Mapbox

```
import Mapboxgl from 'mapbox-gl'; // or "const Mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = '[Aqui va el token]';

```

Una vez realizada la conexion tenemos que mostrar el mapa que requiere dos elementos un `divMap` y las coordenadas.

```
// map-view.component.html

<div #mapDiv class="map-container"></div>

```

El css para este `map-container`

```
.map-container {
  position: fixed;
  top: 0px;
  right: 0px;
  width: 100vw;
  height: 100vh;
}

```

Y la conexion del lado del back con el `ViewChild` para poder tener mas mapas desplegados al mismo tiempo y el `ngAfterViewInit` para tener las coordenadas del navegador.

```
// map-view.component.ts

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../services';
import { Map } from 'mapbox-gl';

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
      style: 'mapbox://styles/mapbox/satellite-v9', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
  }

  constructor(
    private placesService: PlacesService
  ) { }
}

```

El MapBox tiene diferentes `styles` como:

```
mapbox://styles/mapbox/streets-v12
mapbox://styles/mapbox/outdoors-v12
mapbox://styles/mapbox/light-v11
mapbox://styles/mapbox/dark-v11
mapbox://styles/mapbox/satellite-v9
mapbox://styles/mapbox/satellite-streets-v12
mapbox://styles/mapbox/navigation-day-v1
mapbox://styles/mapbox/navigation-night-v1
```

Y tambien se puede generar nuestro estilos personalizados.

## Marcadores

Para hacer un marcador en el mapa con su popup necesitamos importar:

```
import { Map, Popup, Marker } from 'mapbox-gl';
```

El `Popup` y `Marker` son clases los cuales tienen metodos que nos permiten añadirlos al mapa.

```
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
  }
```

Con el `Popup` creamos el mensaje que queremos que muestre y este dentro tambien puede contener diferentes estilos.
Con el `Marker` hacemos el indicador del mapa y luego le agregamos al mapa con el `.addto(map)`, para poder mostrarlo en el mapa.

## Polylinles

## Rutas

## Direcciones

## Distancias

## Custom Http Clients ( muy útil )

# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
