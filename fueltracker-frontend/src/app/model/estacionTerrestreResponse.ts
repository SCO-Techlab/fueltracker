import { EstacionTerrestre } from "./estacionTerrestre";

export class EstacionTerrestreResponse {
    Fecha: string;
    ListaEESSPrecio: EstacionTerrestre[];
    TotalEstaciones?: number;
    Nota: string;
    ResultadoConsulta: string;
    typeObj?: string;
}