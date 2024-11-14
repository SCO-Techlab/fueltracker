import { PosteMaritimoDto } from './posteMaritimo.dto';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetPostesMaritimosResponse { 
    @IsString()
    @IsNotEmpty()
    Fecha: string;

    @IsNotEmpty()
    ListaEESSPrecio: PosteMaritimoDto[];

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
        this.typeObj = "GetPostesMaritimosResponse";
    }
}