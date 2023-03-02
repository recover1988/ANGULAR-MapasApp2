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
