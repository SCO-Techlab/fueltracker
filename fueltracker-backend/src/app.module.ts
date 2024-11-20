import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule } from './modules/logger/logger.module';
import { configurationApp } from './configuration/configuration-app';
import { configurationWebsocket } from './configuration/configuration-websocket';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { WebsocketConfig } from './modules/websocket/config/websocket-config';
import { PublicMiddleware } from './middlewares/public.middleware';
import { CcaaModule } from './modules/ccaa/ccaa.module';
import { EstacionesTerrestresModule } from './modules/estaciones-terrestres/estaciones-terrestres.module';
import { MunicipiosModule } from './modules/municipios/municipios.module';
import { PostesMaritimosModule } from './modules/postes-maritimos/postes-maritimos.module';
import { ProductosPetroliferosModule } from './modules/productos-petroliferos/productos-petroliferos.module';
import { ProvinciasModule } from './modules/provincias/provincias.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        configurationApp,
        configurationWebsocket,
      ],
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    WebsocketModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const websocketConfig: WebsocketConfig = {
          port: configService.get('websocket.port'),
          origin: configService.get('websocket.origin'),
        };
        return websocketConfig;
      },
      inject: [ConfigService],
    }),
    LoggerModule,

    CcaaModule,
    EstacionesTerrestresModule,
    MunicipiosModule,
    PostesMaritimosModule,
    ProductosPetroliferosModule,
    ProvinciasModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(PublicMiddleware).forRoutes("*");
  }
}