import { IsNotEmpty, IsOptional, IsString, } from 'class-validator';

export class MunicipioDto {
  @IsString()
  @IsNotEmpty()
  IDMunicipio: string;

  @IsString()
  @IsNotEmpty()
  IDProvincia: string;

  @IsString()
  @IsNotEmpty()
  IDCCAA: string;

  @IsString()
  @IsNotEmpty()
  Municipio: string;

  @IsString()
  @IsNotEmpty()
  Provincia: string;

  @IsString()
  @IsNotEmpty()
  CCAA: string;

  @IsString()
  @IsOptional()
  typeObj?: string;

  constructor(IDMunicipio: string, IDProvincia: string, IDCCAA: string, Municipio: string, Provincia: string, CCAA: string) {
    this.IDMunicipio = IDMunicipio;
    this.IDProvincia = IDProvincia;
    this.IDCCAA = IDCCAA;
    this.Municipio = Municipio;
    this.Provincia = Provincia;
    this.CCAA = CCAA;
    this.typeObj = 'Municipio';
  }
}