import { Utils } from './../../../../utils/utils';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { OSM } from 'ol/source';
import { EstacionTerrestre } from 'src/app/model/estacionTerrestre';
import { Icon, Style } from 'ol/style.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { ScoTranslateService } from '@sco-techlab/sco-angular-components';
import Overlay from 'ol/Overlay.js';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map';
import View from 'ol/View';
import * as proj from 'ol/proj';
import * as geom from 'ol/geom';
import * as bootstrap from 'bootstrap';
import 'ol/ol.css';

export const ANIMATE_DURATION: number = 500;

@Component({
  selector: 'app-openlayers',
  templateUrl: './openlayers.component.html',
  styleUrls: ['./openlayers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OpenlayersComponent implements OnInit, OnChanges {

  @Input() width: string = "100%"; // Parametro de anchura para la visuazliación del mapa
  @Input() height: string = "25vh"; // Parametro de altura para la visualización del mapa
  @Input() latitude: string; // Latitud del  usuario (No de una estación)
  @Input() longitude: string; // Longitud del usuario (No de una estación)
  @Input() fuelStations: EstacionTerrestre[]; // Parametro de entrada para las estaciones que se debe crear un markup en el mapa
  @Input() selectedItemMap: EstacionTerrestre; // Estación seleccionada
  @Input() cleanPopup: bootstrap = false;

  @Output() selectMapItem: EventEmitter<boolean>;

  /* Number Parse Int Of Inputs */
  private _long: number;
  private _lat: number;

  /* Map Vectors */
  private _userUbicationVector: any;
  private _fuelStationsUbicationSector: any;

  /* Map Popup */
  private _popover: any;
  private _popup: any;
  private _popupElement: any;

  /* Map Icon Features */
  private _features: any[];
  
  /* Map Last Selected item */
  private _lastSelectedCords: any;

  /* Map Data */
  public map!: Map;

  /* Map Loaded Flag */
  public load: boolean;

  constructor(
    private readonly translateService: ScoTranslateService,
  ) {
    this.selectMapItem = new EventEmitter<boolean>();

    this.load = false;
  }

  /* Initial Map Create */
  ngOnInit(): void {
    // Create Map
    this.map = new Map({
      target: 'map',

      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      
      view: new View({ 
        center: [0, 0],
        zoom: 15,
        maxZoom: 18, 
      }),
    });

    // Create Popup elements
    this._popover = undefined;
    this._popupElement = document.getElementById('popup');
    this._popup = new Overlay({
      element: this._popupElement,
      positioning: 'bottom-center',
      stopEvent: false,
      className: 'ol-popover',
    });

    // Add popup element to map
    this.map.addOverlay(this._popup);

    // Set movestart output event
    this.onMoveStart();

    // Load map
    this.load = true;
  }

  /* Map Changes */
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    // If Maps Isnt Load Ignore Changes
    if (!this.load) {
      return;
    }

    // Hide map layers until changes done
    this.map.getLayers().forEach(layer => layer.setVisible(false));

    if (changes) {
      if (changes['cleanPopup']) {
        this._popover = this.disposePopover(this._popover);
      }

      if (changes["selectedItemMap"]) {
        this.selectedItemMap = changes["selectedItemMap"].currentValue;
        if (this.selectedItemMap) {
         await this.createSelectedItemMapMark(this.selectedItemMap);
        }
      }

      if (changes["latitude"] || changes["longitude"]) {
        await this.createUserUbicationMark();
      }

      if (changes["fuelStations"]) {
        await this.createMapMarks();
      }
    }

    // Show map layers when changes are done
    this.map.getLayers().forEach(layer => layer.setVisible(true));
  }

  /* Map Marks Functions */
  async createUserUbicationMark() {
    // Format user ubication
    this._lat = Number.parseFloat(this.latitude);
    this._long = Number.parseFloat(this.longitude);
    
    this.map.getView().setCenter(proj.transform([this._long, this._lat], 'EPSG:4326', 'EPSG:3857'));

    const iconFeature = new Feature({
      geometry: new geom.Point(proj.transform([this._long, this._lat], 'EPSG:4326', 'EPSG:3857')),
      name: 'user-ubication',
      population: 4000,
      rainfall: 500,
    });
    
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        offset: [0,0],
        offsetOrigin: 'bottom-left',
        rotation: 0,
        src: 'assets/img/marker-ubi-fill.png',
        height: 50,
        width: 50,
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    this._userUbicationVector = new VectorLayer({
      source: vectorSource,
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });

    this.map.addLayer(this._userUbicationVector);
  }

  async createMapMarks() {
    if (!this.fuelStations || (this.fuelStations && this.fuelStations.length == 0)) {
      return;
    }

    // Create icon features (Map Marks) from provided fuel stations
    let iconFeatures: any[] = [];
    for (const station of this.fuelStations) {
      const _lat = Number.parseFloat(station.Latitud.replace(",", "."));
      const _long = Number.parseFloat(station.Longitud.replace(",", "."));

      const iconFeature = new Feature({
        geometry: new geom.Point(proj.transform([_long, _lat], 'EPSG:4326', 'EPSG:3857')),
        name: JSON.stringify(station),
        population: 4000,
        rainfall: 500,
      });
      
      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          offset: [0,0],
          offsetOrigin: 'bottom-left',
          rotation: 0,
          src: 'assets/img/marker-fill.png',
          height: 50,
          width: 50,
        }),
      });

      iconFeature.setStyle(iconStyle);
      iconFeatures.push(iconFeature);
    }

    // Save Feature to track coords
    this._features = iconFeatures;

    // If Not Fefatures Not need to add new map vect o r
    if (!iconFeatures || (iconFeatures && iconFeatures.length == 0)) {
      return;
    }
    
    // Add Map Vector Layer
    const vectorSource = new VectorSource({
      features: iconFeatures,
    });

    if (this._fuelStationsUbicationSector != undefined) {
      this.map.removeLayer(this._fuelStationsUbicationSector);
      this._fuelStationsUbicationSector = undefined;
    }

    this._fuelStationsUbicationSector = new VectorLayer({
      source: vectorSource,
      updateWhileAnimating: true,
      updateWhileInteracting: true,
      visible: true,
    });

    this.map.addLayer(this._fuelStationsUbicationSector);
  }

  async createSelectedItemMapMark(station: EstacionTerrestre) {
    // Hide If Last popover continue showing
    this._popover = this.disposePopover(this._popover);

    // Get Selected Feature
    let selectedFeature: any = undefined;
    if (this._features && this._features.length > 0) {
    for (const feature of this._features) {
      if (feature.values_.name == JSON.stringify(station)) {
        selectedFeature = feature;
        break;
      }
    }
    }

    // Check If Feature is found
    if (!selectedFeature) return;

    // Get Station Coords
    const _lat = Number.parseFloat(station.Latitud.replace(",", "."));
    const _long = Number.parseFloat(station.Longitud.replace(",", "."));
    const coords = proj.transform([_long, _lat], 'EPSG:4326', 'EPSG:3857');

    // Set Default Map Animation Move Duration
    let animateDuration: number = ANIMATE_DURATION;

    // set map Animation Move
    await new Promise<boolean>((resolve) => {
    this.map.getView().animate({ 
      center: coords, 
      zoom: 15, 
      duration: animateDuration 
    });
    resolve(true);
    });

    // Check if selected map item is equals that last selected map item, animation duration is less time
    if (this._lastSelectedCords != undefined) {
      if (selectedFeature.geometryChangeKey_.target.flatCoordinates == this._lastSelectedCords) {
        animateDuration = 200;
      }
    }
    
    // Save current feature coords to check next iteration 
    this._lastSelectedCords = selectedFeature.geometryChangeKey_.target.flatCoordinates;

    // Wait until map animation finish, then show popup
    setTimeout(() => {
      // Set Station Coords To Popup
      this._popup.setPosition(this._lastSelectedCords);

      // Create popup content
      const content: string = this.getFuelStationPopoverContent(station);

      // Create popover
      this._popover = new bootstrap.Popover(this._popupElement, {
        placement: 'top',
        html: true,
        content: content,
      });

      // Show popover
      this._popover.show();

      // Set selected item map undefined
      this.selectedItemMap = undefined;

      // Emit Event Is Done
      this.selectMapItem.emit(true);
    }, (animateDuration + 200));    
  }

  /* Map Output Functions */
  async onClickMap($event) {
    if (!$event) return;

    // Get Feature from click
    const feature: any = this.map.forEachFeatureAtPixel([$event.layerX, $event.layerY], function (feature) {
      return feature;
    });

    // Hide If Last popover continue showing
    this._popover = this.disposePopover(this._popover);

    // Check if there arent feature on click
    if (!feature) return;

    // Set popup open coordinates
    const coordinate = feature.geometryChangeKey_.target.flatCoordinates;
    this._popup.setPosition(coordinate);

    // Set popup content
    let content: string = this.translateService.getTranslate('label.google-maps.current.location');
    if (feature.get('name') != 'user-ubication') {
      const station: EstacionTerrestre = JSON.parse(feature.get('name'));
      content = this.getFuelStationPopoverContent(station);
    }

    // Create popover
    this._popover = new bootstrap.Popover(this._popupElement, {
      placement: 'top',
      html: true,
      content: content,
    });

    // Show popover
    this._popover.show();
  }

  async onPointermove($event) {
    const hit = this.map.forEachFeatureAtPixel([$event.layerX, $event.layerY], function(feature, layer) {
      return true;
    }); 

    if (hit) {
      this.map.getTargetElement().style.cursor = 'pointer';
      return;
    }
    
    this.map.getTargetElement().style.cursor = '';
  }

  onMoveStart() {
    // Set popover dipose function for event context
    const moveStartDispose = () => {
      if (this._popover) {
        this._popover.dispose();
        this._popover = undefined;
      }
    };

    // Start map movestart event
    this.map.on("movestart", function (evt) {
      moveStartDispose();
    });
  }

  /* Private Controller Functions */
  private disposePopover(popover: any) {
    if (popover) {
      popover.dispose();
      popover = undefined;
    }

    return popover;
  };

  private getFuelStationPopoverContent(station: EstacionTerrestre): string {
    const content: string = `
        <p>
          <center>
            ${station?.Rotulo} - ${station?.Municipio} (${Utils.formatKilometersValue(station?.kilometers_distance)} KM)
          </center>
        </p>
        <p>
          <span>
            <strong>${this.translateService.getTranslate('label.google-maps.info.address')}:&nbsp;</strong>
          </span>
          <span>${station.Direccion}</span>
          <br>
          <span>
            <strong>${this.translateService.getTranslate('label.google-maps.info.timeTable')}:&nbsp;</strong>
          </span>
          <span>${station.Horario}</span>
        </p>
        <ul>
          ${
            !station.Precio_Gasoleo_A
              ? ``
              : `
                <li>
                <span>
                  <strong>${this.translateService.getTranslate('label.google-maps.info.gasoleo.a')}:&nbsp;</strong>
                </span>
                <span>${station.Precio_Gasoleo_A ? station.Precio_Gasoleo_A : '--'}</span>
                </li>
              `
          }
          ${
            !station.Precio_Gasoleo_Premium
              ? ``
              : `
                <li>
                <span>
                  <strong>${this.translateService.getTranslate('label.google-maps.info.gasoleo.a.premium')}:&nbsp;</strong>
                </span>
                <span>${station.Precio_Gasoleo_Premium ? station.Precio_Gasoleo_Premium : '--'}</span>
                </li>
              `
          }
          ${
            !station.Precio_Gasolina_95_E10
              ? ``
              : `
                <li>
                <span>
                  <strong>${this.translateService.getTranslate('label.google-maps.info.gasolina.95.e10')}:&nbsp;</strong>
                </span>
                <span>${station.Precio_Gasolina_95_E10 ? station.Precio_Gasolina_95_E10 : '--'}</span>
                </li>
              `
          }
          ${
            !station.Precio_Gasolina_95_E5
              ? ``
              : `
                <li>
                <span>
                  <strong>${this.translateService.getTranslate('label.google-maps.info.gasolina.95.e5')}:&nbsp;</strong>
                </span>
                <span>${station.Precio_Gasolina_95_E5 ? station.Precio_Gasolina_95_E5 : '--'}</span>
                </li>
              `
          }
          ${
            !station.Precio_Gasolina_95_E5_Premium
              ? ``
              : `
                <li>
                <span>
                  <strong>${this.translateService.getTranslate('label.google-maps.info.gasolina.95.e5.premium')}:&nbsp;</strong>
                </span>
                <span>${station.Precio_Gasolina_95_E5_Premium ? station.Precio_Gasolina_95_E5_Premium : '--'}</span>
                </li>
              `
          }
          ${
            !station.Precio_Gasolina_98_E10
              ? ``
              : `
                <li>
                <span>
                  <strong>${this.translateService.getTranslate('label.google-maps.info.gasolina.98.e10')}:&nbsp;</strong>
                </span>
                <span>${station.Precio_Gasolina_98_E10 ? station.Precio_Gasolina_98_E10 : '--'}</span>
                </li>
              `
          }
          ${
            !station.Precio_Gasolina_98_E5
              ? ``
              : `
                <li>
                <span>
                  <strong>${this.translateService.getTranslate('label.google-maps.info.gasolina.98.e5')}:&nbsp;</strong>
                </span>
                <span>${station.Precio_Gasolina_98_E5 ? station.Precio_Gasolina_98_E5 : '--'}</span>
                </li>
              `
          }
        </ul>
    `;

    return content;
  }
}
