import { Component } from '@angular/core';
import { MapService } from '../../services';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  goToMyLocation() {
    // Condiciones
    if (!this.placesService.isUserLocationReady) throw Error('No hay ubicacion del usuario')
    if (!this.mapService.isMapReady) throw Error('No hay mapa disponible')
    // Uso del servicio para ir a algun punto del mapa en este caso al origen
    this.mapService.flyTo(this.placesService.userLocation!)
  }

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) { }
}
