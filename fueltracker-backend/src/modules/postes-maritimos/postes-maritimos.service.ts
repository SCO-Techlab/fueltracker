import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { GetPostesMaritimosResponse } from "./dto/getPostesMaritimosResponse";
import { PosteMaritimoDto } from "./dto/posteMaritimo.dto";

@Injectable()
export class PostesMaritimosService {

    constructor(private readonly httpService: HttpService) { }

    async getPostesMaritimos(): Promise<GetPostesMaritimosResponse> {
        const response: any = await this.httpService.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/PostesMaritimos/')
        .toPromise()
        .then(res => res.data)
        .catch(err => console.log(`Error: ${JSON.stringify(err)}`));

        if (!response) {
            return;
        }

        let postesMaritimosResponse: GetPostesMaritimosResponse = new GetPostesMaritimosResponse();
        postesMaritimosResponse.Fecha = response.Fecha;
        postesMaritimosResponse.Nota = response.Nota;
        postesMaritimosResponse.ResultadoConsulta = response.ResultadoConsulta;
        postesMaritimosResponse.ListaEESSPrecio = [];

        if (response.ListaEESSPrecio && response.ListaEESSPrecio.length > 0) {
            let postesMaritimosList: PosteMaritimoDto[] = [];
            for (const posteMaritimo of response.ListaEESSPrecio) {
                const posteMaritimoDto: PosteMaritimoDto = {
                    CP: posteMaritimo["C.P."],
                    Direccion: posteMaritimo.Dirección,
                    Horario: posteMaritimo.Horario,
                    Latitud: posteMaritimo.Latitud,
                    Localidad: posteMaritimo.Localidad,
                    Longitud: posteMaritimo["Longitud (WGS84)"],
                    Municipio: posteMaritimo.Municipio,
                    Precio_Gasoleo_A_habitual: posteMaritimo["Precio Gasoleo A habitual"],
                    Precio_Gasoleo_B: posteMaritimo["Precio Gasoleo B"],
                    Precio_Gasoleo_95_E10: posteMaritimo["Precio Gasolina 95 E10"],
                    Precio_Gasoleo_95_E5: posteMaritimo["Precio Gasolina 95 E5"],
                    Precio_Gasoleo_para_uso_marítimo: posteMaritimo["Precio Gasóleo para uso marítimo"],
                    Provincia: posteMaritimo.Provincia,
                    Puerto: posteMaritimo.Puerto,
                    Remision: posteMaritimo.Remisión,
                    Rotulo: posteMaritimo.Rótulo,
                    Tipo_Venta: posteMaritimo["Tipo Venta"],
                    IDPosteMaritimo: posteMaritimo.IDPosteMaritimo,
                    IDMunicipio: posteMaritimo.IDMunicipio,
                    IDProvincia: posteMaritimo.IDProvincia,
                    IDCCAA: posteMaritimo.IDCCAA,
                };
                postesMaritimosList.push(posteMaritimoDto);
            }

            postesMaritimosResponse.ListaEESSPrecio = postesMaritimosList;
        }

        return postesMaritimosResponse;
    }

}
