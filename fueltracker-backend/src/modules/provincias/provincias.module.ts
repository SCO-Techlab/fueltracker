import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ProvinciasController } from "./provincias.controller";
import { ProvinciasService } from "./provincias.service";

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [
        ProvinciasController
    ],
    providers: [
        ProvinciasService,
    ],
    exports: [
        ProvinciasService
    ]
})
export class ProvinciasModule { }
