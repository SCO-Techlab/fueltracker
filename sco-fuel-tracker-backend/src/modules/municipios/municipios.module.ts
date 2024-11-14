import { MunicipiosService } from './municipios.service';
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { MunicipiosController } from "./municipios.controller";

@Module({
imports: [
    HttpModule,
  ],
  controllers: [
    MunicipiosController
  ],
  providers: [
    MunicipiosService,
  ],
  exports: [
    MunicipiosService
  ]
})
export class MunicipiosModule { }
