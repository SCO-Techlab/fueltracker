import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { EstacionTerrestreDto } from "./dto/estacionTerrestre.dto";
import { GetEstacionesTerrestresResponse } from "./dto/getEstacionesTerrestresResponse";

@Injectable()
export class EstacionesTerrestresHistService {

    constructor(private readonly httpService: HttpService) { }

    async getEstacionesTerrestresHistorico(fecha: string): Promise<GetEstacionesTerrestresResponse> {          
        try {
            const response: any = await this.httpService.get(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestresHist/${fecha}`)
            .toPromise()
            .then(res => res.data)
            .catch(err => console.log(`Error: ${JSON.stringify(err)}`));

            if (!response) {
                return;
            }

            let estacionesTerrestresResponse: GetEstacionesTerrestresResponse = new GetEstacionesTerrestresResponse();
            estacionesTerrestresResponse.Fecha = response.Fecha;
            estacionesTerrestresResponse.Nota = response.Nota;
            estacionesTerrestresResponse.ResultadoConsulta = response.ResultadoConsulta;
            estacionesTerrestresResponse.ListaEESSPrecio = [];

            if (response.ListaEESSPrecio && response.ListaEESSPrecio.length > 0) {
                let estacionesTerrestresList: EstacionTerrestreDto[] = [];
                for (const estacionTerrestre of response.ListaEESSPrecio) {
                    const posteMaritimoDto: EstacionTerrestreDto = {
                        CP: estacionTerrestre["C.P."],
                        Direccion: estacionTerrestre.Dirección,
                        Horario: estacionTerrestre.Horario,
                        Latitud: estacionTerrestre.Latitud,
                        Localidad: estacionTerrestre.Localidad,
                        Longitud: estacionTerrestre["Longitud (WGS84)"],
                        Margen: estacionTerrestre.Margen,
                        Municipio: estacionTerrestre.Municipio,
                        Precio_Biodiesel: estacionTerrestre["Precio Biodiesel"],
                        Precio_Bioetanol: estacionTerrestre["Precio Bioetanol"],
                        Precio_Gas_Natural_Comprimido: estacionTerrestre["Precio Gas Natural Comprimido"],
                        Precio_Gas_Natural_Licuado: estacionTerrestre["Precio Gas Natural Licuado"],
                        Precio_Gases_Licuados_del_petroleo: estacionTerrestre["Precio Gases licuados del petróleo"],
                        Precio_Gasoleo_A: estacionTerrestre["Precio Gasoleo A"],
                        Precio_Gasoleo_B: estacionTerrestre["Precio Gasoleo B"],
                        Precio_Gasoleo_Premium: estacionTerrestre["Precio Gasoleo Premium"],
                        Precio_Gasolina_95_E10: estacionTerrestre["Precio Gasolina 95 E10"],
                        Precio_Gasolina_95_E5: estacionTerrestre["Precio Gasolina 95 E5"],
                        Precio_Gasolina_95_E5_Premium: estacionTerrestre["Precio Gasolina 95 E5 Premium"],
                        Precio_Gasolina_98_E10: estacionTerrestre["Precio Gasolina 98 E10"],
                        Precio_Gasolina_98_E5: estacionTerrestre["Precio Gasolina 98 E5"],
                        Precio_Hidrogeno: estacionTerrestre["Precio Hidrogeno"],
                        Provincia: estacionTerrestre.Provincia,
                        Remision: estacionTerrestre.Remisión,
                        Rotulo: estacionTerrestre.Rótulo,
                        Tipo_Venta: estacionTerrestre["Tipo Venta"],
                        percent_BioEtanol: estacionTerrestre["% BioEtanol"],
                        percent_EsterMetalico: estacionTerrestre["% Éster metílico"],
                        IDEESS: estacionTerrestre.IDEESS,
                        IDMunicipio: estacionTerrestre.IDMunicipio,
                        IDProvincia: estacionTerrestre.IDProvincia,
                        IDCCAA: estacionTerrestre.IDCCAA,
                    };
                    estacionesTerrestresList.push(posteMaritimoDto);
                }

                estacionesTerrestresResponse.ListaEESSPrecio = estacionesTerrestresList;
            }

            return estacionesTerrestresResponse;
        } catch (err) {
            console.log(JSON.stringify(err))
        }

        return null;
    }
}
