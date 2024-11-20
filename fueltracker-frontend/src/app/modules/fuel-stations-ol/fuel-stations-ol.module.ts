import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScoAngularComponentsModule, ScoJoinPipe } from '@sco-techlab/sco-angular-components';
import { NgxsModule } from '@ngxs/store';
import { AppGoogleMapsModule } from '../google-maps/google-maps.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FuelStationsDistanceCalculatorOlComponent } from './components/fuel-stations-distance-calculator-ol/fuel-stations-distance-calculator-ol.component';
import { FuelStationsOlState } from './store/fuel-stations-ol.state';
import { FuelStationsOlService } from './fuel-stations-ol.service';
import { OpenlayersComponent } from './components/openlayers/openlayers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScoAngularComponentsModule,
    NgxsModule.forFeature(
      [
        FuelStationsOlState
      ]
    ),
    AppGoogleMapsModule,
    NgxPaginationModule,
  ],
  declarations: [
    FuelStationsDistanceCalculatorOlComponent,
    OpenlayersComponent,
  ],
  exports: [
    FuelStationsDistanceCalculatorOlComponent,
    OpenlayersComponent,
  ],
  providers:[
    FuelStationsOlService,
    ScoJoinPipe
  ]
})
export class FuelStationsOlModule { }
