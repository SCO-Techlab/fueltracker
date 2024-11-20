import { ProductosPetroliferosService } from './productos-petroliferos.service';
import { Controller, Get} from "@nestjs/common";
import { ProductoPetrolDto } from './dto/productoPetrol.dto';

@Controller('api/v1/productosPetroliferos')
export class ProductosPetroliferosController {

  constructor(private productosPetroliferosService: ProductosPetroliferosService) {}

  @Get('productosPetroliferos')
  getProductosPetroliferos(): Promise<ProductoPetrolDto[]> {
    return this.productosPetroliferosService.getProductosPetroliferos();
  }
}
  