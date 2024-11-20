import { IsNotEmpty, IsOptional, IsString, } from 'class-validator';

export class EstacionTerrestreDto {
  @IsString()
  @IsOptional()
  id_estacionTerrestre?: string;

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
  Margen: string;

  @IsString()
  @IsNotEmpty()
  Municipio: string;

  @IsString()
  @IsNotEmpty()
  Precio_Biodiesel: string;

  @IsString()
  @IsNotEmpty()
  Precio_Bioetanol: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gas_Natural_Comprimido: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gas_Natural_Licuado: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gases_Licuados_del_petroleo: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasoleo_A: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasoleo_B: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasoleo_Premium: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasolina_95_E10: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasolina_95_E5: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasolina_95_E5_Premium: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasolina_98_E10: string;

  @IsString()
  @IsNotEmpty()
  Precio_Gasolina_98_E5: string;

  @IsString()
  @IsNotEmpty()
  Precio_Hidrogeno: string;

  @IsString()
  @IsNotEmpty()
  Provincia: string;

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
  percent_BioEtanol: string;

  @IsString()
  @IsNotEmpty()
  percent_EsterMetalico: string;

  @IsString()
  @IsNotEmpty()
  IDEESS: string;

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
    id_estacionTerrestre: string,
    CP: string, Direccion: string, Horario: string, Latitud: string, Localidad: string, Longitud: string, Margen: string,  Municipio: string,
    Precio_Biodiesel: string, Precio_Bioetanol: string, Precio_Gas_Natural_Comprimido: string, Precio_Gas_Natural_Licuado: string, Precio_Gases_Licuados_del_petroleo: string,
    Precio_Gasoleo_A: string, Precio_Gasoleo_B: string, Precio_Gasoleo_Premium: string,
    Precio_Gasolina_95_E10: string, Precio_Gasolina_95_E5: string, Precio_Gasolina_95_E5_Premium: string,
    Precio_Gasolina_98_E10: string, Precio_Gasolina_98_E5: string, Precio_Hidrogeno: string,
    Provincia: string, Remision: string, Rotulo: string, Tipo_Venta: string,  percent_BioEtanol: string, percent_EsterMetalico: string, 
    IDEESS: string, IDMunicipio: string, IDProvincia: string, IDCCAA: string,
    ) {
    this.id_estacionTerrestre = id_estacionTerrestre;
    this.CP = CP;
    this.Direccion = Direccion;
    this.Horario = Horario;
    this.Latitud = Latitud;
    this.Localidad = Localidad;
    this.Longitud = Longitud;
    this.Margen = Margen;
    this.Municipio = Municipio;
    this.Precio_Biodiesel = Precio_Biodiesel;
    this.Precio_Bioetanol = Precio_Bioetanol;
    this.Precio_Gas_Natural_Comprimido = Precio_Gas_Natural_Comprimido;
    this.Precio_Gas_Natural_Licuado = Precio_Gas_Natural_Licuado;
    this.Precio_Gases_Licuados_del_petroleo = Precio_Gases_Licuados_del_petroleo;
    this.Precio_Gasoleo_A = Precio_Gasoleo_A;
    this.Precio_Gasoleo_B = Precio_Gasoleo_B;
    this.Precio_Gasoleo_Premium = Precio_Gasoleo_Premium;
    this.Precio_Gasolina_95_E10 = Precio_Gasolina_95_E10;
    this.Precio_Gasolina_95_E5 = Precio_Gasolina_95_E5;
    this.Precio_Gasolina_95_E5_Premium = Precio_Gasolina_95_E5_Premium;
    this.Precio_Gasolina_98_E10 = Precio_Gasolina_98_E10;
    this.Precio_Gasolina_98_E5 = Precio_Gasolina_98_E5;
    this.Precio_Hidrogeno = Precio_Hidrogeno;
    this.Provincia = Provincia;
    this.Remision = Remision;
    this.Rotulo = Rotulo;
    this.Tipo_Venta = Tipo_Venta;
    this.percent_BioEtanol = percent_BioEtanol;
    this.percent_EsterMetalico = percent_EsterMetalico;
    this.IDEESS = IDEESS;
    this.IDMunicipio = IDMunicipio;
    this.IDProvincia = IDProvincia;
    this.IDCCAA = IDCCAA;
    this.typeObj = 'PosteMaritimo';
  }
}