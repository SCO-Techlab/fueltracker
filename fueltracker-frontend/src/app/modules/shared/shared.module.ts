import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EnumToArrayPipe } from './loop-enum.pipe';
import { EnumToArrayNotDividing } from './enum.pipe';
import { ExistsElementPipe } from './exists-element.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
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
