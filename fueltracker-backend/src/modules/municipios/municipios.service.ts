import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { MunicipioDto } from "./dto/municipio.dto";

@Injectable()
export class MunicipiosService {

    constructor(private readonly httpService: HttpService) { }

    async getMunicipios(): Promise<MunicipioDto[]> {
        const response: any = await this.httpService.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Municipios/')
        .toPromise()
        .then(res => res.data)
        .catch(err => console.log(`Error: ${JSON.stringify(err)}`));

        if (!response) {
            return;
        }

        let municipiosList: MunicipioDto[] = [];
        for (const municipio of response) {
            const municipioDto: MunicipioDto = new MunicipioDto(municipio.IDMunicipio, municipio.IDProvincia, municipio.IDCCAA, municipio.Municipio, municipio.Provincia, municipio.CCAA);
            municipiosList.push(municipioDto);
        }

        return municipiosList;
    }

}
