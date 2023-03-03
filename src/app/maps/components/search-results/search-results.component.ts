import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selectedId: string = '';

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature) {

    this.selectedId = place.id

    const [lng, lat] = place.center;
    this.mapServices.flyTo([lng, lat])
  }

  getDirections(place: Feature) {

    if (!this.placesService.userLocation) throw Error('No hay userLocation')
    this.placesService.deletePlaces();
    const start = this.placesService.userLocation;
    const end = place.center as [number, number];

    this.mapServices.getRouteBetweenPoints(start, end);
  }

  constructor(
    private placesService: PlacesService,
    private mapServices: MapService
  ) { }

}
