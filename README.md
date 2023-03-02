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

## Marcadores

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
