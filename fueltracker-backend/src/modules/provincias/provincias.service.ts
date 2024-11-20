import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ProvinciaDto } from "./dto/provincia.dto";

@Injectable()
export class ProvinciasService {

    constructor(private readonly httpService: HttpService) { }

    async getProvincias(): Promise<ProvinciaDto[]> {
        const response: any = await this.httpService.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/')
        .toPromise()
        .then(res => res.data)
        .catch(err => console.log(`Error: ${JSON.stringify(err)}`));

        if (!response) {
            return;
        }

        let provinciasList: ProvinciaDto[] = [];
        for (const provincia of response) {
            const provinciaDto: ProvinciaDto = new ProvinciaDto(provincia.IDPovincia, provincia.IDCCAA, provincia.Provincia, provincia.CCAA, undefined);
            provinciasList.push(provinciaDto);
        }

        return provinciasList;
    }

}
