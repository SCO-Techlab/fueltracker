import { ProvinciasService } from './provincias.service';
import { ProvinciaDto } from './dto/provincia.dto';
import { Controller, Get } from "@nestjs/common";

@Controller('api/v1/provincias')
export class ProvinciasController {
  constructor(private provinciasService: ProvinciasService) {}

  @Get('provincias')
  getProvincias(): Promise<ProvinciaDto[]> {
    return this.provinciasService.getProvincias();
  }
}
  