import { ProductosPetroliferosService } from './productos-petroliferos.service';
import { ProductosPetroliferosController } from './productos-petroliferos.controller';
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        HttpModule,
      ],
      controllers: [
        ProductosPetroliferosController
      ],
      providers: [
        ProductosPetroliferosService,
      ],
      exports: [
        ProductosPetroliferosService
      ]
})
export class ProductosPetroliferosModule { }
