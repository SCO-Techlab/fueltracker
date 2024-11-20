import { Utils } from './../../utils/utils';
import { ScoResolutionService, ScoConstantsService, ScoTranslateService } from 'sco-angular-components';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { catchError, map, Observable, of } from 'rxjs';
import { EstacionTerrestre } from '../../model/estacionTerrestre';
import environment from '../../../environments/environment';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit, OnChanges {

  @Input() width: string = "100%"; // Parametro de anchura para la visuazliación del mapa
  @Input() height: string = "25vh"; // Parametro de altura para la visualización del mapa

  @Input() latitude: string; // Latitud del  usuario (No de una estación)
  @Input() longitude: string; // Longitud del usuario (No de una estación)

  @Input() fuelStations: EstacionTerrestre[]; // Parametro de entrada para las estaciones que se debe crear un markup en el mapa

  public apiLoaded: Observable<boolean>; // Marca si la API de google maps se ha cargado correctamente para mostrar o no el mapa

  public options: google.maps.MapOptions; // Objeto de opciones del mapa

  public userMarkerOptions: google.maps.MarkerOptions; // Objeto de opciones de la marca del mapa de la ubicación del usuario
  public markerOptions: google.maps.MarkerOptions; // Objeto de opciones de las marcas del mapa de las ubicaciones de las gasolieneras
  public markerPositions: any[]; // Array de objetos LatLngLiteral (Coordenadas de las marcas) // Type Object -> google.maps.LatLngLiteral

  private lastInfoWindowOpened: MapInfoWindow;

  constructor(
    private readonly httpClient: HttpClient,
    public readonly resolutionService: ScoResolutionService,
    public readonly constantsService: ScoConstantsService,
    public readonly translateService: ScoTranslateService,
  ) {
    this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCTTv0oHH32THPyNwyd7KKN1T5K-UGXhuc', 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes["latitude"] || changes["longitude"]) {
        this.ngOnInit();
      }

      if (changes["fuelStations"]) {
        this.createMapMarks();
      }
    }
  }

  async ngOnInit() {
    this.options = {
      center: { lat: Number.parseFloat(this.latitude), lng: Number.parseFloat(this.longitude)},
      zoom: 12.5,
      disableDefaultUI: true,
    };

    this.userMarkerOptions = {
      draggable: false,
      icon: {                             
        url: environment.production ? 
          "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png" : 
          'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      }
    };

    this.markerOptions = {
      draggable: false,
      icon: {                             
        url: environment.production ?
          "https://maps.google.com/mapfiles/ms/icons/blue-dot.png" :
          "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      }
    };

    this.lastInfoWindowOpened = undefined;

    await this.createMapMarks();
  }

  async createMapMarks() {
    this.markerPositions = [];

    // Marca de posición de la ubicación del usuario
    this.markerPositions.push({lat: Number.parseFloat(this.latitude), lng: Number.parseFloat(this.longitude), item: undefined});

    // Marcas de posición de las ubicacines de las gasolineras introducidas por parámetros
    for (const fuelStation of this.fuelStations) {
      this.markerPositions.push({
        lat: Number.parseFloat(fuelStation.Latitud.replace(",", ".")), 
        lng: Number.parseFloat(fuelStation.Longitud.replace(",", ".")),
        item: fuelStation
      });
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
    //this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    //this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    // Control If Double Click On Same Mark For Close It
    if (infoWindow && (infoWindow == this.lastInfoWindowOpened)) {
      this.lastInfoWindowOpened.close();
      this.lastInfoWindowOpened = undefined;
      return;
    }
    
    if (!marker || !infoWindow) {
      return;
    }

    // Control If There Was Another Last InfoWindow Opened And Close It
    if (this.lastInfoWindowOpened) {
      this.lastInfoWindowOpened.close()
    }
    
    this.lastInfoWindowOpened = infoWindow;

    infoWindow.open(marker);
  }

  openFuelStationInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    if (!marker || !infoWindow) {
      return;
    }
    
    if (this.lastInfoWindowOpened) {
      this.lastInfoWindowOpened.close()
    }

    this.lastInfoWindowOpened = infoWindow;

    infoWindow.open(marker);
  }

  formatKilometersValue(kilometers: string) {
    return Utils.formatKilometersValue(kilometers);
  }

  static openOnMap(fuelStation: EstacionTerrestre) {
    if (!fuelStation) {
      return;
    }

    const btn: any = document.getElementById(fuelStation.Rotulo + "-" + fuelStation.Direccion);
    if (btn) {
      btn.click();
    }
  }
}
