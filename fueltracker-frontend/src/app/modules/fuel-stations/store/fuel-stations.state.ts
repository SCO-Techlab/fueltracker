import { EstacionTerrestreResponse } from '../../../model/estacionTerrestreResponse';
import { FuelStationsService } from './../fuel-stations.service';
import { EstacionTerrestre } from '../../../model/estacionTerrestre';
import { ScoTranslateService } from '@sco-techlab/sco-angular-components';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, map } from "rxjs/operators";
import { GetEstacionesTerrestres, GetEstacionesTerrestresMongo } from './fuel-stations.actions';

export class FuelStationsStateModel {
  estacionesTerrestres: EstacionTerrestre[];
  estacionTerrestreResponse: EstacionTerrestreResponse;
  success: boolean;
  errorMsg: string;
  successMsg: string;
}

export const FuelStationsStateDefault: FuelStationsStateModel = {
  estacionesTerrestres: [],
  estacionTerrestreResponse: undefined,
  success: false,
  errorMsg: '',
  successMsg: '',
};

@State<FuelStationsStateModel>({
  name: "fuelStations",
  defaults: FuelStationsStateDefault,
})

@Injectable()
export class FuelStationsState {

  constructor(
    private readonly translateService: ScoTranslateService,
    private readonly fuelStationsService: FuelStationsService,
  ) {
    
  }

  @Selector()
  static estacionesTerrestres(state: FuelStationsStateModel): EstacionTerrestre[] {
    return state.estacionesTerrestres;
  }

  @Selector()
  static estacionTerrestreResponse(state: FuelStationsStateModel): EstacionTerrestreResponse {
    return state.estacionTerrestreResponse;
  }

  @Selector()
  static success(state: FuelStationsStateModel): boolean {
    return state.success;
  }

  @Selector()
  static errorMsg(state: FuelStationsStateModel): string {
    return state.errorMsg;
  }

  @Selector()
  static successMsg(state: FuelStationsStateModel): string {
    return state.successMsg;
  }
  
  @Action(GetEstacionesTerrestres)
  public getEstacionesTerrestres (
    { patchState }: StateContext<FuelStationsStateModel>,
  ) {
    return this.fuelStationsService.getEstacionesTerrestres().pipe(
      map((estacionTerrestreResponse: EstacionTerrestreResponse) => {
        patchState({
          success: true,
          estacionTerrestreResponse: estacionTerrestreResponse,
          successMsg: this.translateService.getTranslate('label.fuel-stations.distance-calculator.getFuelStations.success')
        });
      }),
      catchError((err) => {
        patchState({
          success: false,
          estacionTerrestreResponse: undefined,
          errorMsg: this.translateService.getTranslate('label.fuel-stations.distance-calculator.getFuelStations.error'),
        });

        throw new Error(err);
      })
    );
  }

  @Action(GetEstacionesTerrestresMongo)
  public getEstacionesTerrestresMongo (
    { patchState }: StateContext<FuelStationsStateModel>,
  ) {
    return this.fuelStationsService.getEstacionesTerrestresMongo().pipe(
      map((estacionesTerrestres: EstacionTerrestre[]) => {
        patchState({
          success: true,
          estacionesTerrestres: estacionesTerrestres,
          successMsg: this.translateService.getTranslate('label.fuel-stations.distance-calculator.getFuelStations.success')
        });
      }),
      catchError((err) => {
        patchState({
          success: false,
          estacionesTerrestres: undefined,
          errorMsg: this.translateService.getTranslate('label.fuel-stations.distance-calculator.getFuelStations.error'),
        });

        throw new Error(err);
      })
    );
  }
}

