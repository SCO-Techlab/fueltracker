import { IsNotEmpty, IsOptional, IsString, } from 'class-validator';

export class CcaaDto {
  @IsString()
  @IsNotEmpty()
  idCcaa: string;

  @IsString()
  @IsNotEmpty()
  ccaa: string;

  @IsString()
  @IsOptional()
  typeObj?: string;

  constructor(idCcaa: string, ccaa: string) {
    this.idCcaa = idCcaa;
    this.ccaa = ccaa;
    this.typeObj = 'Ccaa';
  }
}