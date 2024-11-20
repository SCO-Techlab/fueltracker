import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { CcaaDto } from "./dto/ccaa.dto";


@Injectable()
export class CcaaService {

    constructor(private readonly httpService: HttpService) { }

    async getComunidadesAutonomas(): Promise<CcaaDto[]> {
        const response: any = await this.httpService.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/')
        .toPromise()
        .then(res => res.data)
        .catch(err => console.log(`Error: ${JSON.stringify(err)}`));

        if (!response) {
            return;
        }

        let ccaaList: CcaaDto[] = [];
        for (const ccaa of response) {
            const ccaaDto: CcaaDto = new CcaaDto(ccaa.IDCCAA, ccaa.CCAA);
            ccaaList.push(ccaaDto);
        }

        return ccaaList;
    }

}
