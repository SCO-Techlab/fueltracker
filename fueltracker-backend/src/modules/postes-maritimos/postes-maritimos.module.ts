import { PostesMaritimosService } from './postes-maritimos.service';
import { PostesMaritimosController } from './postes-maritimos.controller';
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        HttpModule,
      ],
      controllers: [
        PostesMaritimosController
      ],
      providers: [
        PostesMaritimosService,
      ],
      exports: [
        PostesMaritimosService
      ]
})
export class PostesMaritimosModule { }
