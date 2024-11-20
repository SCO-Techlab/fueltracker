import { EstacionTerrestreResponse } from '../../../model/estacionTerrestreResponse';
import { FuelStationsOlService } from '../fuel-stations-ol.service';
import { EstacionTerrestre } from '../../../model/estacionTerrestre';
import { ScoTranslateService } from '@sco-techlab/sco-angular-components';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, map } from "rxjs/operators";
import { GetEstacionesTerrestresMongoOl, GetEstacionesTerrestresOl } from './fuel-stations-ol.actions';

export class FuelStationsOlStateModel {
  estacionesTerrestres: EstacionTerrestre[];
  estacionTerrestreResponse: EstacionTerrestreResponse;
  success: boolean;
  errorMsg: string;
  successMsg: string;
}

export const FuelStationsOlStateDefault: FuelStationsOlStateModel = {
  estacionesTerrestres: [],
  estacionTerrestreResponse: undefined,
  success: false,
  errorMsg: '',
  successMsg: '',
};

@State<FuelStationsOlStateModel>({
  name: "fuelStationsol",
  defaults: FuelStationsOlStateDefault,
})

@Injectable()
export class FuelStationsOlState {

  constructor(
    private readonly translateService: ScoTranslateService,
    private readonly fuelStationsOlService: FuelStationsOlService,
  ) {
    
  }

  @Selector()
  static estacionesTerrestres(state: FuelStationsOlStateModel): EstacionTerrestre[] {
    return state.estacionesTerrestres;
  }

  @Selector()
  static estacionTerrestreResponse(state: FuelStationsOlStateModel): EstacionTerrestreResponse {
    return state.estacionTerrestreResponse;
  }

  @Selector()
  static success(state: FuelStationsOlStateModel): boolean {
    return state.success;
  }

  @Selector()
  static errorMsg(state: FuelStationsOlStateModel): string {
    return state.errorMsg;
  }

  @Selector()
  static successMsg(state: FuelStationsOlStateModel): string {
    return state.successMsg;
  }
  
  @Action(GetEstacionesTerrestresOl)
  public getEstacionesTerrestresOl (
    { patchState }: StateContext<FuelStationsOlStateModel>,
  ) {
    return this.fuelStationsOlService.getEstacionesTerrestresOl().pipe(
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

  @Action(GetEstacionesTerrestresMongoOl)
  public getEstacionesTerrestresMongoOl (
    { patchState }: StateContext<FuelStationsOlStateModel>,
  ) {
    return this.fuelStationsOlService.getEstacionesTerrestresMongoOl().pipe(
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

