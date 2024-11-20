import { EstacionesTerrestresService } from './estaciones-terrestres.service';
import { Controller, Get } from "@nestjs/common";
import { GetEstacionesTerrestresResponse } from './dto/getEstacionesTerrestresResponse';

@Controller('api/v1/estacionesTerrestres')
export class EstacionesTerrestresController {
  constructor(private estacionesTerrestresService: EstacionesTerrestresService) {}
  
  @Get('estacionesTerrestres')
  async getEstacionesTerrestres(): Promise<GetEstacionesTerrestresResponse> {
    return await this.estacionesTerrestresService.getEstacionesTerrestres();
  }
}
  