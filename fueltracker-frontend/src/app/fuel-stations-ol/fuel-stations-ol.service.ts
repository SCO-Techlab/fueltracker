import { EstacionTerrestreResponse } from '../model/estacionTerrestreResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import environment from 'src/environments/environment';
import { EstacionTerrestre } from '../model/estacionTerrestre';

@Injectable({
  providedIn: 'root'
})
export class FuelStationsOlService {

  constructor(
    private readonly http: HttpClient,
  ) {}

  getEstacionesTerrestresOl(): Observable<EstacionTerrestreResponse> {
    return this.http.get<EstacionTerrestreResponse>(environment.apiUrl + `/estacionesTerrestres/estacionesTerrestres`);
  }

  getEstacionesTerrestresMongoOl(): Observable<EstacionTerrestre[]> {
    return this.http.get<EstacionTerrestre[]>(environment.apiUrl + `/estacionesTerrestres/estacionesTerrestresMongo`);
  }
}
