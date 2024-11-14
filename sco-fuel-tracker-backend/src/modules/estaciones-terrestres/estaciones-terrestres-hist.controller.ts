import { Controller, Get, Param } from "@nestjs/common";
import { GetEstacionesTerrestresResponse } from './dto/getEstacionesTerrestresResponse';
import { EstacionesTerrestresHistService } from './estaciones-terrestres-hist.service';

@Controller('api/v1/estacionesTerrestresHist')
export class EstacionesTerrestresHistController {
  
  constructor(private estacionesTerrestresHistService: EstacionesTerrestresHistService) {}

  @Get('estacionesTerrestresHistorico/:fecha')
  getEstacionesTerrestresHistorico(@Param('fecha') fecha: string): Promise<GetEstacionesTerrestresResponse> {
    return this.estacionesTerrestresHistService.getEstacionesTerrestresHistorico(fecha);
  }
}
  