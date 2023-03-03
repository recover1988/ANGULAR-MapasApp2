import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    this.isLoadingPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=5&proximity=-64.19084689256306%2C-31.39028741611226&language=es&access_token=pk.eyJ1IjoiZXJpY2RlbmlzLTE5ODgiLCJhIjoiY2xla2VpYTV5MGpqbDN3bzZoYTJjaTJjNiJ9.8MKm8rvuDojCSKU1y9RPHQ`)
      .subscribe(resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
      })
  }

  constructor(
    private http: HttpClient
  ) {
    this.getUserLocation();
  }
}
