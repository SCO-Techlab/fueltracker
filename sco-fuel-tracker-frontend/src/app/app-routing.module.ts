import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FuelStationsDistanceCalculatorOlComponent } from './modules/fuel-stations-ol/components/fuel-stations-distance-calculator-ol/fuel-stations-distance-calculator-ol.component';

const routes: Routes = [
  {
    path: '',
    component: FuelStationsDistanceCalculatorOlComponent,
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
