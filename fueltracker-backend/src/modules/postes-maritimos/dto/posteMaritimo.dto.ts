import { IsNotEmpty, IsOptional, IsString, } from 'class-validator';

export class PosteMaritimoDto {
  @IsString()
  @IsNotEmpty()
  CP: string;

  @IsString()
  @IsNotEmpty()
  Direccion: string;

  @IsString()
  @IsNotEmpty()
  Horario: string;

  @IsString()
  @IsNotEmpty()
  Latitud: string;

  @IsString()
  @IsNotEmpty()
  Localidad: string;

  @IsString()
  @IsNotEmpty()
  Longitud: string;

  @IsString()
  @IsNotEmpty()
  Municipio: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasoleo_A_habitual: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasoleo_B: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasoleo_95_E10: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasoleo_95_E5: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasoleo_para_uso_marítimo: string;

  @IsString()
  @IsNotEmpty()
  Provincia: string;

  @IsString()
  @IsNotEmpty()
  Puerto: string;

  @IsString()
  @IsNotEmpty()
  Remision: string;

  @IsString()
  @IsNotEmpty()
  Rotulo: string;

  @IsString()
  @IsNotEmpty()
  Tipo_Venta: string;

  @IsString()
  @IsNotEmpty()
  IDPosteMaritimo: string;

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
  @IsOptional()
  typeObj?: string;

  constructor(
    CP: string, Direccion: string, Horario: string, Latitud: string, Localidad: string, Longitud: string, Municipio: string,
    Precio_Gasoleo_A_habitual: string, Precio_Gasoleo_B: string, Precio_Gasoleo_95_E10: string, Precio_Gasoleo_95_E5: string, Precio_Gasoleo_para_uso_marítimo: string,
    Provincia: string, Puerto: string, Remision: string, Rotulo: string, Tipo_Venta: string, IDPosteMaritimo: string,
    IDMunicipio: string, IDProvincia: string, IDCCAA: string,
    ) {
    this.CP = CP;
    this.Direccion = Direccion;
    this.Horario = Horario;
    this.Latitud = Latitud;
    this.Localidad = Localidad;
    this.Longitud = Longitud;
    this.Municipio = Municipio;
    this.Precio_Gasoleo_A_habitual = Precio_Gasoleo_A_habitual;
    this.Precio_Gasoleo_B = Precio_Gasoleo_B;
    this.Precio_Gasoleo_95_E10 = Precio_Gasoleo_95_E10;
    this.Precio_Gasoleo_95_E5 = Precio_Gasoleo_95_E5;
    this.Precio_Gasoleo_para_uso_marítimo = Precio_Gasoleo_para_uso_marítimo;
    this.Provincia = Provincia;
    this.Puerto = Puerto;
    this.Remision = Remision;
    this.Rotulo = Rotulo;
    this.Tipo_Venta = Tipo_Venta;
    this.IDPosteMaritimo = IDPosteMaritimo;
    this.IDMunicipio = IDMunicipio;
    this.IDProvincia = IDProvincia;
    this.IDCCAA = IDCCAA;
    this.typeObj = 'PosteMaritimo';
  }
}