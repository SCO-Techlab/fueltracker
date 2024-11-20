import { EstacionesTerrestresHistService } from './estaciones-terrestres-hist.service';
import { EstacionesTerrestresHistController } from './estaciones-terrestres-hist.controller';
import { EstacionesTerrestresService } from './estaciones-terrestres.service';
import { EstacionesTerrestresController } from './estaciones-terrestres.controller';
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        HttpModule,
      ],
      controllers: [
        EstacionesTerrestresController,
        EstacionesTerrestresHistController,
      ],
      providers: [
        EstacionesTerrestresService,
        EstacionesTerrestresHistService,
      ],
      exports: [
        EstacionesTerrestresService,
        EstacionesTerrestresHistService,
      ]
})
export class EstacionesTerrestresModule { }
