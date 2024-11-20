import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EnumToArrayPipe } from './pipes/loop-enum.pipe';
import { EnumToArrayNotDividing } from './pipes/enum.pipe';
import { ExistsElementPipe } from './pipes/exists-element.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ScoAngularComponentsModule } from 'sco-angular-components';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ScoAngularComponentsModule,
    PdfViewerModule
  ],
  declarations: [
    EnumToArrayPipe,
    EnumToArrayNotDividing,
    ExistsElementPipe,
  ],
  exports: [
    EnumToArrayPipe,
    EnumToArrayNotDividing,
    ExistsElementPipe,
  ],
  providers: [
    
  ]
})
export class SharedModule { }
