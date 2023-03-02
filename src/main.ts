import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


if (!navigator.geolocation) {
  throw new Error('Navegador no soporta geolocalizacion')
}



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
