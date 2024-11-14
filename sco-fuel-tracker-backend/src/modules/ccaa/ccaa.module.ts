import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { CcaaController } from "./ccaa.controller";
import { CcaaService } from "./ccaa.service";

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [
    CcaaController
  ],
  providers: [
    CcaaService,
  ],
  exports: [
    CcaaService
  ]
})
export class CcaaModule { }
