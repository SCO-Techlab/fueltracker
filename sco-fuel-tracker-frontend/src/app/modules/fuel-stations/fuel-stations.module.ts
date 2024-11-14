import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScoAngularComponentsModule, ScoJoinPipe } from 'sco-angular-components';
import { NgxsModule } from '@ngxs/store';
import { FuelStationsService } from './fuel-stations.service';
import { FuelStationsDistanceCalculatorComponent } from './components/fuel-stations-distance-calculator/fuel-stations-distance-calculator.component';
import { FuelStationsState } from './store/fuel-stations.state';
import { AppGoogleMapsModule } from '../google-maps/google-maps.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScoAngularComponentsModule,
    NgxsModule.forFeature(
      [
        FuelStationsState
      ]
    ),
    AppGoogleMapsModule,
    NgxPaginationModule,
  ],
  declarations: [
    FuelStationsDistanceCalculatorComponent
  ],
  exports: [
    FuelStationsDistanceCalculatorComponent
  ],
  providers:[
    FuelStationsService,
    ScoJoinPipe
  ]
})
export class FuelStationsModule { }
