import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ProductoPetrolDto } from "./dto/productoPetrol.dto";

@Injectable()
export class ProductosPetroliferosService {

    constructor(private readonly httpService: HttpService) { }

    async getProductosPetroliferos(): Promise<ProductoPetrolDto[]> {
        const response: any = await this.httpService.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProductosPetroliferos/')
        .toPromise()
        .then(res => res.data)
        .catch(err => console.log(`Error: ${JSON.stringify(err)}`));

        if (!response) {
            return;
        }

        let productsPetrolList: ProductoPetrolDto[] = [];
        for (const product of response) {
            const productDto: ProductoPetrolDto = new ProductoPetrolDto(product.IDProducto, product.NombreProducto, product.NombreProductoAbreviatura);
            productsPetrolList.push(productDto);
        }

        return productsPetrolList;
    }
}
