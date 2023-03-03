import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api/placesApiClient';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

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

  getPlacesByQuery(query: string = '') {

    if (!this.userLocation) throw Error('No hay userLocation')

    this.isLoadingPlaces = true;

    this.placeApi.get<PlacesResponse>(`${query}.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
      .subscribe(resp => {
        console.log(resp.features)
        this.isLoadingPlaces = false;
        this.places = resp.features;
      })
  }

  constructor(
    private placeApi: PlacesApiClient
  ) {
    this.getUserLocation();
  }
}
