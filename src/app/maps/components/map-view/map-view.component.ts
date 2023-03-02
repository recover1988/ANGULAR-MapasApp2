import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styles: [
  ]
})
export class MapViewComponent {


  constructor(
    private placesService: PlacesService
  ) { }

}
