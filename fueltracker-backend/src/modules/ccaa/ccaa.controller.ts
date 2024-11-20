import { CcaaService } from './ccaa.service';
import { Controller, Get } from "@nestjs/common";
import { CcaaDto } from './dto/ccaa.dto';

@Controller('api/v1/ccaa')
export class CcaaController {
  constructor(private ccaaService: CcaaService) {}

  @Get('comunidadesAutonomas')
  getComunidadesAutonomas(): Promise<CcaaDto[]> {
    return this.ccaaService.getComunidadesAutonomas();
  }
}
  