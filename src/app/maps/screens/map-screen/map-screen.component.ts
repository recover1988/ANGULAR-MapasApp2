import { Component } from '@angular/core';
import { PlacesService } from '../../services/index';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent {


  constructor(
    private placesService: PlacesService
  ) { }
}
