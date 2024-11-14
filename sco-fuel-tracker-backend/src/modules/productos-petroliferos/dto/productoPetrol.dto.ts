import { IsNotEmpty, IsOptional, IsString, } from 'class-validator';

export class ProductoPetrolDto {
  @IsString()
  @IsNotEmpty()
  IDProducto: string;

  @IsString()
  @IsNotEmpty()
  NombreProducto: string;

  @IsString()
  @IsNotEmpty()
  NombreProductoAbreviatura: string;

  @IsString()
  @IsOptional()
  typeObj?: string;

  constructor(IDProducto: string, NombreProducto: string, NombreProductoAbreviatura: string) {
    this.IDProducto = IDProducto;
    this.NombreProducto = NombreProducto;
    this.NombreProductoAbreviatura = NombreProductoAbreviatura;
    this.typeObj = 'ProductoPetrol';
  }
}