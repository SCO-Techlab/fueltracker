import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule} from '@ngxs/store';
import { NFC } from '@awesome-cordova-plugins/nfc/ngx';
import { FuelStationsOlModule } from './fuel-stations-ol/fuel-stations-ol.module';
import { ScoAngularComponentsModule, ScoConfigService, ScoTranslateService  } from '@sco-techlab/sco-angular-components';

export function configFactory(provider: ScoConfigService  ) {
  return () => provider.getDataFromJson('assets/config/data.json');
}

export function translateFactory(provider: ScoTranslateService) {
  return () => provider.getData('assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([]),
    ScoAngularComponentsModule,
    HttpClientModule,
    FuelStationsOlModule,
  ],
  providers: [
    NFC,
    ScreenOrientation,
    NavParams,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [ScoTranslateService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ScoConfigService],
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
