import { Utils } from '../../../utils/utils';
import { cloneDeep } from 'lodash-es';
import { EstacionTerrestreResponse } from '../../../model/estacionTerrestreResponse';
import { Store } from '@ngxs/store';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScoSelectItem, ScoToastService, ScoTranslateService, ScoCacheService, ScoBlockItem, ScoAction, ScoSelectedItem, ScoConstantsService, ScoModalService, ScoResolutionService, ScoSpinnerService } from '@sco-techlab/sco-angular-components';
import { EstacionTerrestre } from '../../../model/estacionTerrestre';
import { GetEstacionesTerrestresOl } from '../../store/fuel-stations-ol.actions';
import { FuelStationsOlState } from '../../store/fuel-stations-ol.state';

@Component({
  selector: 'app-fuel-stations-distance-calculator-ol',
  templateUrl: './fuel-stations-distance-calculator-ol.component.html',
  styleUrls: ['./fuel-stations-distance-calculator-ol.component.scss']
})
export class FuelStationsDistanceCalculatorOlComponent implements OnInit, AfterViewInit {

  public isPageLoaded: boolean;

  public inputDistanceValue: number;
  public inputDistanceOptions: ScoSelectItem<any>[] = [];

  public currentLatitude: string;
  public currentLongitude: string;

  public currentPage: number;
  public elementsPerPage: number;

  public currentResponse: EstacionTerrestreResponse;
  public nearFuelStations: EstacionTerrestre[];
  public mapFuelStations: EstacionTerrestre[];
  public blockItems: ScoBlockItem<EstacionTerrestre>[];
  public selectedItem: ScoSelectedItem<EstacionTerrestre>; 
  public selectedItemMap: EstacionTerrestre;

  /* Mobile / Tablet */
  public isMapTab: boolean;
  public currentAppMode: string;

  /* Google Maps Options */
  public firstTimeLoading: boolean;
  public googleMaps_height: string = '100%';

  /* Modal */
  public width: string;
  public height: string;

  public cleanPopup: boolean = false;

  /* ViewChilds */
  @ViewChild('webContent') webContent: ElementRef;

  constructor(
    private readonly spinnerService: ScoSpinnerService,
    public readonly resolutionService: ScoResolutionService,
    private readonly modalService: ScoModalService,
    public readonly constantsService: ScoConstantsService,
    private readonly cacheService: ScoCacheService,
    private readonly toastService: ScoToastService,
    public readonly translateService: ScoTranslateService,
    private readonly store: Store,
  ) {
    this.cacheService.setElement("title", this.translateService.getTranslate('label.fuel-stations.distance-calculator.cache.title'));

    this.inputDistanceOptions = [
      new ScoSelectItem(`${this.translateService.getTranslate('label.fuel-stations.distance-calculator.drowpdown.max')} 1 KM`, 1),
      new ScoSelectItem(`${this.translateService.getTranslate('label.fuel-stations.distance-calculator.drowpdown.max')} 3 KM`, 3),
      new ScoSelectItem(`${this.translateService.getTranslate('label.fuel-stations.distance-calculator.drowpdown.max')} 5 KM`, 5),
      new ScoSelectItem(`${this.translateService.getTranslate('label.fuel-stations.distance-calculator.drowpdown.max')} 10 KM`, 10),
      new ScoSelectItem(`${this.translateService.getTranslate('label.fuel-stations.distance-calculator.drowpdown.max')} 15 KM`, 15),
      new ScoSelectItem(`${this.translateService.getTranslate('label.fuel-stations.distance-calculator.drowpdown.max')} 25 KM`, 25),
      new ScoSelectItem(`${this.translateService.getTranslate('label.fuel-stations.distance-calculator.drowpdown.max')} 50 KM`, 50),
      new ScoSelectItem(`${this.translateService.getTranslate('label.fuel-stations.distance-calculator.drowpdown.max')} 100 KM`, 100),
    ];
    this.inputDistanceValue = this.inputDistanceOptions.find(o => o.value == 1).value;
    this.currentLatitude = '';
    this.currentLongitude = '';

    this.currentPage = 1;

    this.currentResponse = undefined;
    this.nearFuelStations = [];
    this.mapFuelStations = [];

    this.selectedItem = undefined;
    this.selectedItemMap = undefined;

    this.isMapTab = false;

    this.isPageLoaded = false;

    if (this.resolutionService.size == this.constantsService.ScoResolutionConstants.MOBILE) {
      this.width = '80';
      this.height = '70';
    } else if (this.resolutionService.size == this.constantsService.ScoResolutionConstants.TABLET) {
      this.width = '80';
      this.height = '50';
    } else {
      this.width = '80';
      this.height = '45';
    }
  }

  ngAfterViewInit(): void {
    this.firstTimeLoading = true;
  }

  /* Get Estaciones Terrestres */
  async ngOnInit() {
    this.spinnerService.showSpinner();
    const webContentHeight: number = (window.innerHeight - 155); 
    this.googleMaps_height = `${(window.innerHeight - 155)}`;
    //if (this.resolutionService.size == this.constantsService.ScoResolutionConstants.WEB) {
    /* if (environment.isWeb) {
      this.elementsPerPage = Number.parseInt(String((webContentHeight / 75) - 1));
    } else {
      this.elementsPerPage = Number.parseInt(String((webContentHeight / 75) - 1));
    } */
    this.elementsPerPage = Number.parseInt(String((webContentHeight / 75) - 1));
    
    // Get Estaciones Terrestres
    this.store.dispatch(new GetEstacionesTerrestresOl()).subscribe({
      next: async () => {
        const success: boolean = this.store.selectSnapshot(FuelStationsOlState.success);

        if (!success) {
          this.spinnerService.hideSpinner();
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error.title"),
            this.store.selectSnapshot(FuelStationsOlState.errorMsg),
          );
          return;
        }

        this.currentResponse = this.store.selectSnapshot(FuelStationsOlState.estacionTerrestreResponse);
        await this.calculateUserGeolocation();
      },
      error: () => {
        this.spinnerService.hideSpinner();
        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error.title"),
          this.store.selectSnapshot(FuelStationsOlState.errorMsg),
        );
      },
    });
  }

  /* Calculate Users Geolocation */
  async calculateUserGeolocation() {
    if (!navigator || (navigator && !navigator.geolocation)) {
      this.spinnerService.hideSpinner();
      this.toastService.addErrorMessage(
        this.translateService.getTranslate('label.error.title'),
        this.translateService.getTranslate('label.fuel-stations.distance-calculator.browser-not-geolocation')
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      this.currentLatitude = String(position.coords.latitude);
      this.currentLongitude = String(position.coords.longitude);

      await this.filterFuelStations();
    });
  }

  /* Filter Fuel Stations By Km Difference Distance */
  async filterFuelStations() {
    if (!this.currentResponse) {
      return
    }

    this.nearFuelStations = [];
    for (let fuelStation of this.currentResponse.ListaEESSPrecio) {
      const kilometers: number = this.calcCrow(
        this.currentLatitude, 
        this.currentLongitude, 
        fuelStation.Latitud.includes(",") ? fuelStation.Latitud.replace(",", ".") : fuelStation.Latitud, 
        fuelStation.Longitud.includes(",") ? fuelStation.Longitud.replace(",", ".") : fuelStation.Longitud, 
      );

      if (kilometers <= this.inputDistanceValue) {
        let newFuelStation = cloneDeep(fuelStation);
        newFuelStation.kilometers_distance = String(kilometers);
        this.nearFuelStations.push(newFuelStation);
      }
    }

    this.nearFuelStations.sort(function (a, b) {
      // A va primero que B
      if (Number.parseFloat(a.kilometers_distance) < Number.parseFloat(b.kilometers_distance))
          return -1;
      // B va primero que A
      else if (Number.parseFloat(a.kilometers_distance) > Number.parseFloat(b.kilometers_distance))
          return 1;
      // A y B son iguales
      else 
          return 0;
    });

    await this.getMapFuelStations();

    await this.createItems(this.nearFuelStations);
  }

  async getMapFuelStations(closeSpinner: boolean = false) {
    this.mapFuelStations = [];
    if (this.currentPage == 1) {
      this.mapFuelStations = this.nearFuelStations.slice(0, this.elementsPerPage);
    } else {
      const index: number = (this.currentPage-1) * this.elementsPerPage;
      let fin: number = (this.currentPage * this.elementsPerPage);

      if (fin > this.nearFuelStations.length) {
        fin = this.nearFuelStations.length;
      }

      this.mapFuelStations = this.nearFuelStations.slice(index, fin);
    }

    if (closeSpinner) {
      this.spinnerService.hideSpinner();
    }
  }

  /* On Change Input Distance Value */
  async onChangeInputDistanceValue($event: ScoSelectItem<any>) {
    this.spinnerService.showSpinner();

    this.inputDistanceValue = $event.value;
    this.currentPage = 1;
    await this.calculateUserGeolocation();
  }

  /* Calculate Distance Between Two Points (Latitude & Longitude) */
  private calcCrow(lat1, lon1, lat2, lon2) {
    lat1 = Number.parseFloat(String(lat1));
    lon1 = Number.parseFloat(String(lon1));
    lat2 = Number.parseFloat(String(lat2));
    lon2 = Number.parseFloat(String(lon2));

    var R = 6371; // km
    var dLat = Number.parseFloat(String(this.toRad(lat2-lat1)));
    var dLon = Number.parseFloat(String(this.toRad(lon2-lon1)));
    lat1 = Number.parseFloat(String(this.toRad(lat1)));
    lat2 = Number.parseFloat(String(this.toRad(lat2)));

    var a = Number.parseFloat(String(Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2))); 
    var c = Number.parseFloat(String(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)))); 
    var d = Number.parseFloat(String(R * c));
    return d;
  }

  private toRad(Value) {
    return Number.parseFloat(String(Value * Math.PI / 180));
  }
  
  /* BlockList Functions */
  private async createItems(estacionesTerrestres: EstacionTerrestre[]) {
    if (!estacionesTerrestres) {
      return;
    }

    let actions: ScoAction<EstacionTerrestre>[] = [
      {
        label: 'Ver mapa',
        value : 'view',
        icon: 'fa fa-eye'
      }
    ];

    this.blockItems = [];

    for (const fuelStation of estacionesTerrestres) {
      let blockItem = new ScoBlockItem<EstacionTerrestre>();
      blockItem.item = fuelStation;
      blockItem.borderColor = 'green';
      blockItem.actions = [];
      this.blockItems.push(blockItem);
    }

    if (!this.isPageLoaded) {
      this.isPageLoaded = true;
    }

    this.spinnerService.hideSpinner();
  }

  selectItem($event) {
    if (!$event) {
      return;
    }

    this.selectedItem = $event;
    this.modalService.open('prices-modal');
  }

  async onChangePage($event) {
    this.spinnerService.showSpinner();

    this.currentPage = $event;
    await this.getMapFuelStations(true);
  }

  /* Format Decimal Values With Only Two Decimals */
  formatKilometersValue(kilometers: string) {
    return Utils.formatKilometersValue(kilometers);
  }

  /* Load Map Info Window Of Selected Fuel Station */
  showFuelStationOnMap() {
    this.selectedItemMap = this.selectedItem.item;
    this.isMapTab = true;
    this.modalService.close('prices-modal');
  }

  selectMapItem($event: boolean) {
    if ($event) {
      this.selectedItemMap = undefined;
    }
  }

  /* Toggle map */
  toggleMap($event: boolean) {
    if (!$event) {
      this.selectedItemMap = undefined;
      this.cleanPopup = !this.cleanPopup;   
    }
  }
}
