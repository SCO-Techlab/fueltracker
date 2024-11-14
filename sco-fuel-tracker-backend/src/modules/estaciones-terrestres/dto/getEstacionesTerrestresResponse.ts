import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { EstacionTerrestreDto } from './estacionTerrestre.dto';

export class GetEstacionesTerrestresResponse { 
    @IsString()
    @IsNotEmpty()
    Fecha: string;

    @IsNotEmpty()
    ListaEESSPrecio: EstacionTerrestreDto[];

    @IsNumber()
    @IsOptional()
    TotalEstaciones?: number;

    @IsString()
    @IsNotEmpty()
    Nota: string;

    @IsString()
    @IsNotEmpty()
    ResultadoConsulta: string;

    @IsString()
    @IsOptional()
    typeObj?: string;

    constructor() {
        this.typeObj = "GetEstacionesTerrestresResponse";
    }
}