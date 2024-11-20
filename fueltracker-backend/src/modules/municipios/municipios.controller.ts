import { MunicipiosService } from './municipios.service';
import { Controller, Get} from "@nestjs/common";
import { MunicipioDto } from './dto/municipio.dto';

@Controller('api/v1/municipios')
export class MunicipiosController {
  constructor(private municipiosService: MunicipiosService) {}

  @Get('municipios')
  getMunicipios(): Promise<MunicipioDto[]> {
    return this.municipiosService.getMunicipios();
  }
}
  