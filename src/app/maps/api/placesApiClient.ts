import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlacesApiClient extends HttpClient {
  public baseUrl: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places';




  // sobrescribir el get del http
  public override get<T>(url: string, options: {
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
  }) {

    url = this.baseUrl + url;

    // con params agrego valores preconfigurados a la peticion get
    return super.get<T>(url, {
      params: {
        limit: 5,
        language: 'es',
        access_token: environment.apiKey,
        ...options.params
      }
    });
  }






  // esta inyeccion nos permite usar los metodos de http como get, post, put, etc
  constructor(handler: HttpHandler) {
    super(handler);
  }
}
