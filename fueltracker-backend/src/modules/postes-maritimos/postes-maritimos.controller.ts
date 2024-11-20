import { PostesMaritimosService } from './postes-maritimos.service';
import { Controller, Get} from "@nestjs/common";
import { GetPostesMaritimosResponse } from './dto/getPostesMaritimosResponse';

@Controller('api/v1/postesMaritimos')
export class PostesMaritimosController {
  constructor(private postesMaritimosService: PostesMaritimosService) {}
  
  @Get('postesMaritimos')
  getPostesMaritimos(): Promise<GetPostesMaritimosResponse> {
    return this.postesMaritimosService.getPostesMaritimos();
  }
}
  