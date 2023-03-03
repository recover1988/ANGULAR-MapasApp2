import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


import Mapboxgl from 'mapbox-gl'; // or "const Mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpY2RlbmlzLTE5ODgiLCJhIjoiY2xla2VpYTV5MGpqbDN3bzZoYTJjaTJjNiJ9.8MKm8rvuDojCSKU1y9RPHQ';


if (!navigator.geolocation) {
  alert('Navegador no soporte Geolocation')
  throw new Error('Navegador no soporta geolocalizacion')
}



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
