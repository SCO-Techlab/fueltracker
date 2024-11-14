import { CcaaDto } from '../../ccaa/dto/ccaa.dto';
import { IsNotEmpty, IsOptional, IsString, } from 'class-validator';

export class ProvinciaDto {
  @IsString()
  @IsNotEmpty()
  IDPovincia: string;

  @IsString()
  @IsNotEmpty()
  IDCCAA: string;

  @IsString()
  @IsNotEmpty()
  Provincia: string;

  @IsString()
  @IsNotEmpty()
  CCAA: string;

  @IsOptional()
  ccaa_relationated?: CcaaDto;

  @IsString()
  @IsOptional()
  typeObj?: string;

  constructor(IDPovincia: string, IDCCAA: string, Provincia: string, CCAA: string, ccaa_relationated: CcaaDto) {
    this.IDPovincia = IDPovincia;
    this.IDCCAA = IDCCAA;
    this.Provincia = Provincia;
    this.CCAA = CCAA;
    this.ccaa_relationated = ccaa_relationated;
    this.typeObj = 'Provincia';
  }
}