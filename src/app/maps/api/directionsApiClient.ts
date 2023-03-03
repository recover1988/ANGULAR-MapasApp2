import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DirectionsApiClient extends HttpClient {
  public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';

  // sobrescribir el get del http
  public override get<T>(url: string) {
    url = this.baseUrl + url;
    // con params agrego valores preconfigurados a la peticion get
    return super.get<T>(url, {
      params: {
        alternatives: false,
        geometries: 'geojson',
        language: 'es',
        overview: 'simplified',
        steps: false,
        access_token: environment.apiKey,
      }
    });
  }

  // esta inyeccion nos permite usar los metodos de http como get, post, put, etc
  constructor(handler: HttpHandler) {
    super(handler);
  }
}
