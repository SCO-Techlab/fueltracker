import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsComponent } from './google-maps.component';
import { HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { ScoAngularComponentsModule } from '@sco-techlab/sco-angular-components';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    ScoAngularComponentsModule,
  ],
  declarations: [
    GoogleMapsComponent
  ],
  exports: [
    GoogleMapsComponent
  ]
})
export class AppGoogleMapsModule { }
